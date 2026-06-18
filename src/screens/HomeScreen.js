import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from '../constants/theme';
import GoldButton from '../components/GoldButton';
import { getMisterioDelDia, getDiaNombre } from '../data/rosario';
import { useStats } from '../hooks/useStats';

export default function HomeScreen({ navigation }) {
  const misterio = getMisterioDelDia();
  const dia = getDiaNombre();
  const { total, racha } = useStats();

  const ModeCard = ({ emoji, titulo, subtitulo, onPress, accent = false }) => (
    <TouchableOpacity
      style={[styles.modeCard, accent && styles.modeCardAccent]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.modeEmoji}>{emoji}</Text>
      <View style={styles.modeText}>
        <Text style={styles.modeTitulo}>{titulo}</Text>
        <Text style={styles.modeSubtitulo}>{subtitulo}</Text>
      </View>
      <Text style={styles.modeArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.bgDark, '#1E1A30']} style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>CORONA</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Misterio del día */}
        <View style={styles.misterioCard}>
          <View style={styles.misterioTop}>
            <Text style={styles.misterioLabel}>{dia} · Misterios</Text>
            <Text style={styles.misterioEmoji}>{misterio.emoji}</Text>
          </View>
          <Text style={styles.misterioNombre}>{misterio.nombre}</Text>
          <Text style={styles.misterioDesc}>{misterio.descripcion}</Text>
        </View>

        {/* Botón principal */}
        <GoldButton
          title="✦  Comenzar Rosario"
          onPress={() => navigation.navigate('ModeSelect')}
          style={styles.mainBtn}
          textStyle={styles.mainBtnText}
        />

        {/* Racha */}
        <View style={styles.rachaRow}>
          <Text style={styles.rachaText}>🔥 Racha de {racha} {racha === 1 ? 'día' : 'días'}</Text>
          <Text style={styles.rachaTotal}>📿 {total} {total === 1 ? 'rosario' : 'rosarios'}</Text>
        </View>

        {/* Modos */}
        <Text style={styles.sectionTitle}>Modos de oración</Text>

        <ModeCard
          emoji="🧘"
          titulo="Solo"
          subtitulo="A tu ritmo, en paz"
          onPress={() => navigation.navigate('MisterioConfirm', { mode: 'solo' })}
        />
        <ModeCard
          emoji="👨‍👩‍👧"
          titulo="En Grupo"
          subtitulo="Para familia o iglesia"
          onPress={() => navigation.navigate('MisterioConfirm', { mode: 'grupo' })}
        />
        <ModeCard
          emoji="📖"
          titulo="Aprender el Rosario"
          subtitulo="Guía para principiantes"
          onPress={() => navigation.navigate('Aprender')}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 56,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  appName: {
    fontSize: FONTS.size.md,
    color: COLORS.gold,
    letterSpacing: 6,
    fontWeight: '300',
  },
  settingsBtn: { padding: SPACING.sm },
  settingsIcon: { fontSize: 20, color: COLORS.textMuted },

  misterioCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#3A3A60',
    gap: SPACING.xs,
  },
  misterioTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  misterioLabel: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  misterioEmoji: { fontSize: 22 },
  misterioNombre: {
    fontSize: FONTS.size.xxl,
    color: COLORS.gold,
    fontFamily: 'serif',
    marginTop: SPACING.xs,
  },
  misterioDesc: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.md * 1.6,
  },

  mainBtn: {
    width: '100%',
    marginVertical: SPACING.sm,
    minHeight: 80,
  },
  mainBtnText: {
    fontSize: FONTS.size.xl,
    letterSpacing: 1,
  },

  rachaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xs,
  },
  rachaText: { color: COLORS.textSecondary, fontSize: FONTS.size.md },
  rachaTotal: { color: COLORS.textSecondary, fontSize: FONTS.size.md },

  sectionTitle: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: SPACING.sm,
  },

  modeCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  modeCardAccent: { borderColor: COLORS.gold },
  modeEmoji: { fontSize: 28 },
  modeText: { flex: 1 },
  modeTitulo: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  modeSubtitulo: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modeArrow: {
    fontSize: 24,
    color: COLORS.textMuted,
  },
});
