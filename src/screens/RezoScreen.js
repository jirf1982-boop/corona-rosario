import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import BeadRow from '../components/BeadRow';
import ProgressBar from '../components/ProgressBar';
import GoldButton from '../components/GoldButton';
import { buildRosarioSteps } from '../data/rosario';
import { useSpeech } from '../hooks/useSpeech';
import { lightImpact } from '../utils/haptics';

export default function RezoScreen({ navigation, route }) {
  const { mode, rol = 'solo', misterio } = route.params;
  const [steps] = useState(() => buildRosarioSteps(misterio));
  const [stepIdx, setStepIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const step = steps[stepIdx];
  const progress = stepIdx / (steps.length - 1);

  // Cuenta cuentas de Avemaría para la década actual
  const getBeadState = () => {
    if (step.type !== 'avemaria') return { current: 0, done: 0, total: 10 };
    const de = step.de || 10;
    return { current: step.repeticion - 1, done: step.repeticion - 1, total: de };
  };

  const confirmSalir = () => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Deseas salir? Perderás el progreso de esta sesión.')) {
        navigation.replace('Home');
      }
    } else {
      Alert.alert(
        'Salir del Rosario',
        '¿Deseas salir? Perderás el progreso de esta sesión.',
        [
          { text: 'Continuar rezando', style: 'cancel' },
          { text: 'Salir', style: 'destructive', onPress: () => navigation.replace('Home') },
        ]
      );
    }
  };

  const siguiente = useCallback(() => {
    if (stepIdx < steps.length - 1) {
      lightImpact();
      setStepIdx((i) => i + 1);
    }
  }, [stepIdx, steps.length]);

  const isGrupo = mode === 'grupo';
  const esLider = rol === 'lider';

  const getTexto = () => {
    if (!isGrupo) return step?.oracion?.texto || '';
    if (step?.type === 'avemaria') {
      if (esLider) return step.oracion.lider;
      return step.oracion.grupo;
    }
    return step?.oracion?.texto || '';
  };

  useSpeech(getTexto(), audioOn);

  // Pantalla de FIN
  useEffect(() => {
    if (step?.type === 'fin') navigation.replace('Fin');
  }, [step?.type]);

  // Pantalla de anuncio de misterio
  if (step.type === 'misterio_anuncio') {
    return (
      <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={confirmSalir} style={styles.salirBtn}>
            <Text style={styles.salirText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Misterio {step.numero} de 5</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.anuncioContent}>
          <Text style={styles.anuncioStar}>✦</Text>
          <Text style={styles.anuncioOrdinal}>
            {['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto'][step.numero - 1]} Misterio
          </Text>
          <Text style={styles.anuncioTipo}>{step.tipoMisterio.toUpperCase()}</Text>
          <View style={styles.anuncioDivider} />
          <Text style={styles.anuncioNombre}>{step.misterio.nombre}</Text>
          <View style={styles.anuncioMeditacion}>
            <Text style={styles.anuncioMeditacionText}>{step.misterio.meditacion}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <GoldButton title="Continuar  →" onPress={siguiente} style={styles.mainBtn} />
        </View>
      </LinearGradient>
    );
  }

  const beads = getBeadState();

  return (
    <LinearGradient colors={[COLORS.bgDark, '#1E1A30']} style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={confirmSalir} style={styles.salirBtn}>
          <Text style={styles.salirText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {step.context || step.oracion?.nombre || ''}
        </Text>
        <View style={styles.topBarActions}>
          <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>{paused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAudioOn(!audioOn)} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>{audioOn ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rosario visual (solo para Avemarías) */}
      {step.type === 'avemaria' && (
        <View style={styles.beadSection}>
          <BeadRow
            total={beads.total}
            done={beads.done}
            current={beads.current}
          />
          <Text style={styles.beadLabel}>
            {step.oracion?.nombre}  {step.repeticion} / {step.de}
          </Text>
        </View>
      )}

      {/* Contexto del misterio (si aplica) */}
      {step.misterio && (
        <View style={styles.contextBar}>
          <Text style={styles.contextText} numberOfLines={1}>
            {misterio.emoji}  {step.misterio.nombre}
          </Text>
        </View>
      )}

      {/* Zona principal de oración */}
      <ScrollView
        style={styles.oracionScroll}
        contentContainerStyle={styles.oracionContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Modo grupo: etiquetas */}
        {isGrupo && step.type === 'avemaria' && (
          <View style={styles.grupoLabels}>
            {esLider ? (
              <>
                <View style={[styles.grupoBox, styles.grupoBoxLider]}>
                  <Text style={styles.grupoEtiqueta}>TÚ DICES:</Text>
                  <Text style={styles.grupoTexto}>{step.oracion.lider}</Text>
                </View>
                <View style={[styles.grupoBox, styles.grupoBoxGrupo]}>
                  <Text style={styles.grupoEtiqueta}>EL GRUPO RESPONDE:</Text>
                  <Text style={[styles.grupoTexto, styles.grupoTextoSmall]}>{step.oracion.grupo}</Text>
                </View>
              </>
            ) : (
              <>
                <View style={[styles.grupoBox, styles.grupoBoxGrupoSmall]}>
                  <Text style={styles.grupoEtiqueta}>EL LÍDER DICE:</Text>
                  <Text style={[styles.grupoTexto, styles.grupoTextoSmall]}>{step.oracion.lider}</Text>
                </View>
                <View style={[styles.grupoBox, styles.grupoBoxGrupo]}>
                  <Text style={styles.grupoEtiqueta}>TÚ RESPONDES:</Text>
                  <Text style={styles.grupoTexto}>{step.oracion.grupo}</Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Texto normal (no-grupo o no-avemaria) */}
        {(!isGrupo || step.type !== 'avemaria') && (
          <View style={styles.oracionBox}>
            <Text style={styles.oracionNombre}>{step.oracion?.nombre}</Text>
            <Text style={styles.oracionTexto}>{getTexto()}</Text>
            {step.tip && (
              <View style={styles.tipBox}>
                <Text style={styles.tipText}>💡 {step.tip}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Barra de progreso */}
      <View style={styles.progressSection}>
        <ProgressBar progress={progress} />
      </View>

      {/* Botón siguiente — solo líder o modo solo */}
      {(!isGrupo || esLider) && (
        <View style={styles.footer}>
          <GoldButton
            title="SIGUIENTE  →"
            onPress={siguiente}
            style={styles.mainBtn}
          />
        </View>
      )}

      {/* Modo grupo no-líder: indicador */}
      {isGrupo && !esLider && (
        <View style={styles.footer}>
          <View style={styles.esperandoBox}>
            <Text style={styles.esperandoText}>Esperando al líder...</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: 52,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
    height: 96,
  },
  salirBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  salirText: { color: COLORS.textMuted, fontSize: 18 },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    fontWeight: '500',
    paddingHorizontal: SPACING.sm,
  },
  topBarActions: { flexDirection: 'row', gap: 4 },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: { fontSize: 18 },

  beadSection: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    gap: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
    alignItems: 'center',
  },
  beadLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.sm,
    marginTop: 4,
  },

  contextBar: {
    backgroundColor: COLORS.bgCard,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
  },
  contextText: {
    color: COLORS.gold,
    fontSize: FONTS.size.sm,
    letterSpacing: 0.5,
  },

  oracionScroll: { flex: 1 },
  oracionContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    flexGrow: 1,
    justifyContent: 'center',
  },

  oracionBox: { gap: SPACING.md, alignItems: 'center' },
  oracionNombre: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  oracionTexto: {
    fontSize: FONTS.size.xl,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: FONTS.size.xl * 1.8,
    fontFamily: 'serif',
  },
  tipBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    marginTop: SPACING.sm,
    width: '100%',
  },
  tipText: { color: COLORS.textSecondary, fontSize: FONTS.size.md },

  // Modo Grupo
  grupoLabels: { gap: SPACING.md },
  grupoBox: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  grupoBoxLider: { backgroundColor: COLORS.leaderBg },
  grupoBoxGrupo: { backgroundColor: COLORS.groupBg },
  grupoBoxGrupoSmall: { backgroundColor: '#2A2040', opacity: 0.8 },
  grupoEtiqueta: {
    fontSize: FONTS.size.xs,
    color: COLORS.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  grupoTexto: {
    fontSize: FONTS.size.xl,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.xl * 1.7,
    fontFamily: 'serif',
  },
  grupoTextoSmall: { fontSize: FONTS.size.lg },

  progressSection: {
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#2E2E50',
  },

  footer: {
    padding: SPACING.lg,
    paddingBottom: 36,
  },
  mainBtn: { width: '100%' },

  esperandoBox: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#3A3A60',
    borderStyle: 'dashed',
  },
  esperandoText: { color: COLORS.textMuted, fontSize: FONTS.size.md },

  // Anuncio misterio
  anuncioContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  anuncioStar: { fontSize: 28, color: COLORS.gold },
  anuncioOrdinal: { fontSize: FONTS.size.md, color: COLORS.textMuted, letterSpacing: 2 },
  anuncioTipo: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    letterSpacing: 3,
    fontWeight: '300',
  },
  anuncioDivider: { width: 40, height: 1, backgroundColor: COLORS.gold, opacity: 0.4 },
  anuncioNombre: {
    fontSize: FONTS.size.xxxl,
    color: COLORS.gold,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  anuncioMeditacion: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  anuncioMeditacionText: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: FONTS.size.lg * 1.7,
    fontFamily: 'serif',
  },
});
