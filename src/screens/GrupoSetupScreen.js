import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import GoldButton from '../components/GoldButton';

const TIPS_LIDER = [
  'Lee el texto azul en voz alta',
  'El grupo responde el texto violeta',
  'Toca SIGUIENTE cuando terminen',
  'La app te dice qué misterio corresponde',
  'No necesitas memorizar nada',
];

export default function GrupoSetupScreen({ navigation, route }) {
  const { misterio } = route.params;
  const [rol, setRol] = useState(null);
  const [showTips, setShowTips] = useState(false);

  const confirmar = () => {
    if (!rol) return;
    if (rol === 'lider' && !showTips) {
      setShowTips(true);
      return;
    }
    navigation.navigate('RezoGrupo', { misterio, rol });
  };

  // Pantalla de tips para el líder
  if (showTips) {
    return (
      <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
        <View style={styles.tipsContent}>
          <Text style={styles.tipsEmoji}>👤</Text>
          <Text style={styles.tipsTitle}>Cómo dirigir el Rosario</Text>
          <Text style={styles.tipsSubtitulo}>
            Sigue estos pasos y todo fluirá con calma.
          </Text>

          <View style={styles.tipsList}>
            {TIPS_LIDER.map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View style={styles.tipNum}>
                  <Text style={styles.tipNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.avemariaExplainer}>
            <Text style={styles.avemariaTitle}>En el Ave María:</Text>
            <View style={styles.avemariaRow}>
              <View style={[styles.avenariaBadge, styles.badgeAzul]}>
                <Text style={styles.badgeText}>TÚ</Text>
              </View>
              <Text style={styles.avemariaTexto}>"Dios te salve, María..."</Text>
            </View>
            <View style={styles.avemariaRow}>
              <View style={[styles.avenariaBadge, styles.badgeVioleta]}>
                <Text style={styles.badgeText}>GRUPO</Text>
              </View>
              <Text style={styles.avemariaTexto}>"Santa María..."</Text>
            </View>
          </View>

          <GoldButton
            title="Entendido, comenzar  →"
            onPress={() => navigation.navigate('RezoGrupo', { misterio, rol: 'lider' })}
            style={styles.btn}
          />
          <TouchableOpacity onPress={() => setShowTips(false)}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>¿Cuál es{'\n'}tu papel?</Text>
        <Text style={styles.subtitulo}>
          Selecciona tu rol para ver el texto correcto durante el rezo.
        </Text>

        {/* Card LÍDER */}
        <TouchableOpacity
          style={[styles.rolCard, rol === 'lider' && styles.rolCardSelected]}
          onPress={() => setRol('lider')}
          activeOpacity={0.75}
        >
          <View style={styles.rolCardHeader}>
            <Text style={styles.rolEmoji}>👤</Text>
            <View style={styles.rolCardCheck}>
              {rol === 'lider' && <Text style={styles.check}>✓</Text>}
            </View>
          </View>
          <Text style={[styles.rolTitulo, rol === 'lider' && styles.rolTituloSelected]}>
            SOY EL LÍDER
          </Text>
          <Text style={styles.rolSubtitulo}>Dirijo la oración</Text>

          <View style={styles.rolDetalle}>
            <View style={styles.rolDetalleRow}>
              <View style={[styles.detalleTag, styles.detalleTagAzul]}>
                <Text style={styles.detalleTagText}>TÚ DICES</Text>
              </View>
              <Text style={styles.detalleTexto}>Primera parte del Ave María</Text>
            </View>
            <View style={styles.rolDetalleRow}>
              <View style={[styles.detalleTag, styles.detalleTagVioleta]}>
                <Text style={styles.detalleTagText}>GRUPO</Text>
              </View>
              <Text style={styles.detalleTexto}>Tú lo ves como preview</Text>
            </View>
            <View style={styles.rolDetalleRow}>
              <Text style={styles.detalleIcon}>▶</Text>
              <Text style={styles.detalleTexto}>Tú controlas el avance</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Card PARTICIPANTE */}
        <TouchableOpacity
          style={[styles.rolCard, rol === 'grupo' && styles.rolCardSelected, styles.rolCardGrupo]}
          onPress={() => setRol('grupo')}
          activeOpacity={0.75}
        >
          <View style={styles.rolCardHeader}>
            <Text style={styles.rolEmoji}>👥</Text>
            <View style={[styles.rolCardCheck, rol === 'grupo' && styles.rolCardCheckVioleta]}>
              {rol === 'grupo' && <Text style={styles.check}>✓</Text>}
            </View>
          </View>
          <Text style={[styles.rolTitulo, rol === 'grupo' && styles.rolTituloSelectedGrupo]}>
            SOY DEL GRUPO
          </Text>
          <Text style={styles.rolSubtitulo}>Rezo con otros</Text>

          <View style={styles.rolDetalle}>
            <View style={styles.rolDetalleRow}>
              <View style={[styles.detalleTag, styles.detalleTagVioleta]}>
                <Text style={styles.detalleTagText}>TÚ</Text>
              </View>
              <Text style={styles.detalleTexto}>Ves tu respuesta en GRANDE</Text>
            </View>
            <View style={styles.rolDetalleRow}>
              <Text style={styles.detalleIcon}>👁</Text>
              <Text style={styles.detalleTexto}>Ves qué dice el líder (pequeño)</Text>
            </View>
            <View style={styles.rolDetalleRow}>
              <Text style={styles.detalleIcon}>🔔</Text>
              <Text style={styles.detalleTexto}>El líder avanza la oración</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Info V2 */}
        <View style={styles.v2Banner}>
          <Text style={styles.v2BannerEmoji}>🔗</Text>
          <View style={styles.v2BannerTexto}>
            <Text style={styles.v2BannerTitle}>Sincronización remota</Text>
            <Text style={styles.v2BannerSub}>Próximamente: reza desde dispositivos distintos con un código de sala</Text>
          </View>
        </View>

        <GoldButton
          title={rol === 'lider' ? 'Ver cómo dirigir  →' : rol === 'grupo' ? 'Entrar al rezo  →' : 'Selecciona tu rol'}
          onPress={confirmar}
          disabled={!rol}
          style={styles.btn}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 64,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  backBtn: { marginBottom: SPACING.sm },
  back: { color: COLORS.textMuted, fontSize: FONTS.size.md },

  titulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    lineHeight: FONTS.size.xxl * 1.4,
  },
  subtitulo: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.md * 1.6,
  },

  // Cards de rol
  rolCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 2,
    borderColor: '#3A3A60',
  },
  rolCardSelected: { borderColor: COLORS.gold },
  rolCardGrupo: {},
  rolCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rolEmoji: { fontSize: 36 },
  rolCardCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3A3A60',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
  },
  rolCardCheckVioleta: { backgroundColor: COLORS.violet },
  check: { color: '#fff', fontSize: FONTS.size.md, fontWeight: '700' },

  rolTitulo: {
    fontSize: FONTS.size.xl,
    color: COLORS.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  rolTituloSelected: { color: COLORS.gold },
  rolTituloSelectedGrupo: { color: COLORS.violetLight },
  rolSubtitulo: { fontSize: FONTS.size.md, color: COLORS.textMuted },

  rolDetalle: {
    gap: SPACING.sm,
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#3A3A60',
  },
  rolDetalleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  detalleTag: {
    borderRadius: RADIUS.sm,
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm,
    minWidth: 50,
    alignItems: 'center',
  },
  detalleTagAzul: { backgroundColor: COLORS.leaderBg, borderWidth: 1, borderColor: '#2A5080' },
  detalleTagVioleta: { backgroundColor: COLORS.groupBg, borderWidth: 1, borderColor: '#5A3A6A' },
  detalleTagText: { fontSize: FONTS.size.xs, color: COLORS.textSecondary, fontWeight: '700', letterSpacing: 1 },
  detalleIcon: { fontSize: 14, width: 50, textAlign: 'center', color: COLORS.textMuted },
  detalleTexto: { flex: 1, fontSize: FONTS.size.md, color: COLORS.textSecondary },

  // V2 banner
  v2Banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#1A1A2E',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#3A3A60',
    borderStyle: 'dashed',
  },
  v2BannerEmoji: { fontSize: 22 },
  v2BannerTexto: { flex: 1 },
  v2BannerTitle: { fontSize: FONTS.size.sm, color: COLORS.textSecondary, fontWeight: '600' },
  v2BannerSub: { fontSize: FONTS.size.xs, color: COLORS.textMuted, marginTop: 2, lineHeight: FONTS.size.xs * 1.7 },

  btn: { width: '100%', marginTop: SPACING.sm },

  // Tips líder
  tipsContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 64,
    paddingBottom: SPACING.xxl,
    gap: SPACING.lg,
    alignItems: 'center',
  },
  tipsEmoji: { fontSize: 48 },
  tipsTitle: { fontSize: FONTS.size.xxl, color: COLORS.textPrimary, fontFamily: 'serif', textAlign: 'center' },
  tipsSubtitulo: { fontSize: FONTS.size.md, color: COLORS.textSecondary, textAlign: 'center' },

  tipsList: { width: '100%', gap: SPACING.md },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  tipNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  tipNumText: { color: COLORS.bgDark, fontWeight: '700', fontSize: FONTS.size.md },
  tipText: { flex: 1, fontSize: FONTS.size.lg, color: COLORS.textPrimary, lineHeight: FONTS.size.lg * 1.5 },

  avemariaExplainer: {
    width: '100%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  avemariaTitle: { fontSize: FONTS.size.md, color: COLORS.textMuted, marginBottom: SPACING.xs },
  avemariaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  avenariaBadge: {
    borderRadius: RADIUS.sm,
    paddingVertical: 3,
    paddingHorizontal: SPACING.sm,
    minWidth: 56,
    alignItems: 'center',
  },
  badgeAzul: { backgroundColor: COLORS.leaderBg },
  badgeVioleta: { backgroundColor: COLORS.groupBg },
  badgeText: { fontSize: FONTS.size.xs, color: COLORS.textSecondary, fontWeight: '700', letterSpacing: 1 },
  avemariaTexto: { flex: 1, fontSize: FONTS.size.md, color: COLORS.textPrimary, fontFamily: 'serif' },
});
