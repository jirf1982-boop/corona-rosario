import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
  Animated, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import BeadRow from '../components/BeadRow';
import ProgressBar from '../components/ProgressBar';
import GoldButton from '../components/GoldButton';
import GrupoLiderCard from '../components/GrupoLiderCard';
import EsperandoPulse from '../components/EsperandoPulse';
import MisterioAnuncioGrupo from '../components/MisterioAnuncioGrupo';
import { buildRosarioSteps } from '../data/rosario';
import { getConfigGrupo, PARTICIPACION } from '../constants/grupoLogic';
import { useSpeech } from '../hooks/useSpeech';
import * as Haptics from 'expo-haptics';

export default function RezoGrupoScreen({ navigation, route }) {
  const { misterio, rol = 'lider', _initialStep = 0 } = route.params;
  const { width, height } = useWindowDimensions();
  const isTablat = width > 600;
  const esLider = rol === 'lider';

  const [steps] = useState(() => buildRosarioSteps(misterio));
  const [stepIdx, setStepIdx] = useState(_initialStep);
  const [audioOn, setAudioOn] = useState(false);
  const [modoTV, setModoTV] = useState(false);

  const step = steps[stepIdx];
  const progress = stepIdx / (steps.length - 1);
  const config = step ? getConfigGrupo(step) : null;

  // Speak the leader's text when audio is on
  useSpeech(config ? (config.textoLider || step?.oracion?.texto) : null, audioOn);

  // Animación de transición entre pasos
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const siguiente = useCallback(() => {
    if (stepIdx >= steps.length - 1) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
    ]).start();
    setStepIdx((i) => i + 1);
  }, [stepIdx, steps.length, fadeAnim]);

  const confirmSalir = () => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Deseas salir? Perderás el progreso de esta sesión.')) {
        navigation.replace('Home');
      }
    } else {
      Alert.alert('Salir del Rosario', '¿Deseas salir?', [
        { text: 'Continuar rezando', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => navigation.replace('Home') },
      ]);
    }
  };

  // Redirigir al fin
  useEffect(() => {
    if (!step || step.type === 'fin') navigation.replace('Fin');
  }, [step?.type]);

  if (!step || step.type === 'fin') return null;

  // Barra superior compartida
  const TopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={confirmSalir} style={styles.iconBtn}>
        <Text style={styles.iconBtnText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.topBarCenter}>
        {step.type === 'avemaria' && (
          <Text style={styles.topBarSub} numberOfLines={1}>
            {misterio.emoji} {step.misterio?.nombre}
          </Text>
        )}
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {step.context || step.oracion?.nombre || `Misterio ${step.numero}/5`}
        </Text>
      </View>

      <View style={styles.topBarRight}>
        {isTablat && (
          <TouchableOpacity onPress={() => setModoTV(!modoTV)} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>{modoTV ? '📱' : '📺'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setAudioOn(!audioOn)} style={styles.iconBtn}>
          <Text style={styles.iconBtnText}>{audioOn ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>
        <View style={[styles.rolBadge, esLider && styles.rolBadgeLider]}>
          <Text style={styles.rolBadgeText}>{esLider ? '👤 Líder' : '👥 Grupo'}</Text>
        </View>
      </View>
    </View>
  );

  // Anuncio de misterio (pantalla especial)
  if (step.type === 'misterio_anuncio') {
    return (
      <MisterioAnuncioGrupo
        step={step}
        esLider={esLider}
        onContinuar={siguiente}
        topBar={<TopBar />}
      />
    );
  }

  // Beads para Avemaría
  const beads = step.type === 'avemaria'
    ? { done: step.repeticion - 1, total: step.de ?? 10 }
    : null;

  // ─── MODO TV / TABLET: layout horizontal ─────────────────────────
  if (modoTV || isTablat) {
    return (
      <LinearGradient colors={[COLORS.bgDark, '#1E1A30']} style={styles.container}>
        <TopBar />

        <View style={styles.tvLayout}>
          {/* Columna izquierda: líder */}
          <View style={[styles.tvCol, styles.tvColLider]}>
            <Text style={styles.tvColEtiqueta}>
              {config.etiquetaLider || 'EL LÍDER'}
            </Text>
            <Text style={styles.tvTexto}>
              {config.textoLider || step.oracion?.texto}
            </Text>
          </View>

          {/* Divider vertical */}
          <View style={styles.tvDivider} />

          {/* Columna derecha: grupo */}
          <View style={[styles.tvCol, styles.tvColGrupo]}>
            <Text style={[styles.tvColEtiqueta, styles.tvColEtiquetaGrupo]}>
              {config.textoGrupo ? 'TODOS RESPONDEN' : 'TODOS JUNTOS'}
            </Text>
            <Text style={[styles.tvTexto, styles.tvTextoGrupo]}>
              {config.textoGrupo || config.textoLider || step.oracion?.texto}
            </Text>
          </View>
        </View>

        {/* Footer TV */}
        <View style={styles.tvFooter}>
          {beads && (
            <BeadRow total={beads.total} done={beads.done} large />
          )}
          <ProgressBar progress={progress} />
          {esLider && (
            <GoldButton title="SIGUIENTE  →" onPress={siguiente} style={styles.tvBtn} />
          )}
        </View>
      </LinearGradient>
    );
  }

  // ─── MODO MÓVIL: layout vertical ─────────────────────────────────
  return (
    <LinearGradient colors={[COLORS.bgDark, '#1E1A30']} style={styles.container}>
      <TopBar />

      {/* Cuentas del rosario */}
      {beads && (
        <View style={styles.beadSection}>
          <BeadRow total={beads.total} done={beads.done} />
          <Text style={styles.beadLabel}>
            {step.oracion?.nombre}  {step.repeticion} / {step.de}
          </Text>
        </View>
      )}

      {/* Zona principal con animación */}
      <Animated.View style={[styles.oracionZone, { opacity: fadeAnim }]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GrupoLiderCard
            textoLider={config.textoLider || step.oracion?.texto}
            textoGrupo={config.textoGrupo}
            etiquetaLider={esLider ? config.etiquetaLider : config.etiquetaParticipanteLider}
            etiquetaGrupo={esLider ? config.etiquetaGrupo : config.etiquetaParticipanteGrupo}
            esLider={esLider}
          />
        </ScrollView>
      </Animated.View>

      {/* Barra de progreso */}
      <View style={styles.progressSection}>
        <ProgressBar progress={progress} />
      </View>

      {/* Footer: líder tiene botón, participante tiene indicador */}
      <View style={styles.footer}>
        {esLider ? (
          <GoldButton
            title="SIGUIENTE  →"
            onPress={siguiente}
            style={styles.mainBtn}
          />
        ) : (
          <View style={styles.participanteFooter}>
            <EsperandoPulse />
            <Text style={styles.participanteTip}>
              El líder avanza cuando estén listos
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Top Bar ──────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 52,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
    minHeight: 96,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: { fontSize: 16, color: COLORS.textMuted },
  topBarCenter: { flex: 1, alignItems: 'center', paddingHorizontal: SPACING.xs },
  topBarSub: { fontSize: FONTS.size.xs, color: COLORS.textMuted, marginBottom: 2 },
  topBarTitle: { fontSize: FONTS.size.md, color: COLORS.textSecondary, fontWeight: '500' },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rolBadge: {
    backgroundColor: '#2A2A4A',
    borderRadius: RADIUS.full,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
    marginLeft: 4,
  },
  rolBadgeLider: { borderColor: COLORS.gold + '80' },
  rolBadgeText: { fontSize: FONTS.size.xs, color: COLORS.textSecondary },

  // ── Beads ────────────────────────────────────────────────────────
  beadSection: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
  },
  beadLabel: { color: COLORS.textMuted, fontSize: FONTS.size.sm },

  // ── Oración zone ─────────────────────────────────────────────────
  oracionZone: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },

  // ── Progress ─────────────────────────────────────────────────────
  progressSection: {
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#2E2E50',
  },

  // ── Footer ───────────────────────────────────────────────────────
  footer: { padding: SPACING.lg, paddingBottom: 36 },
  mainBtn: { width: '100%' },
  participanteFooter: { alignItems: 'center', gap: SPACING.xs },
  participanteTip: { fontSize: FONTS.size.xs, color: COLORS.textMuted, textAlign: 'center' },

  // ── TV / Tablet layout ───────────────────────────────────────────
  tvLayout: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: 0,
  },
  tvCol: {
    flex: 1,
    padding: SPACING.xl,
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  tvColLider: { backgroundColor: COLORS.leaderBg, borderRadius: RADIUS.xl },
  tvColGrupo: { backgroundColor: COLORS.groupBg, borderRadius: RADIUS.xl },
  tvDivider: { width: SPACING.md },
  tvColEtiqueta: {
    fontSize: FONTS.size.sm,
    color: '#60A0D0',
    letterSpacing: 2,
    fontWeight: '700',
    textAlign: 'center',
  },
  tvColEtiquetaGrupo: { color: COLORS.violetLight },
  tvTexto: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.xxl * 1.7,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  tvTextoGrupo: { color: COLORS.textPrimary },
  tvFooter: {
    padding: SPACING.lg,
    paddingBottom: 36,
    gap: SPACING.md,
  },
  tvBtn: { width: '100%' },
});
