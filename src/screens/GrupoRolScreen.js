import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

export default function GrupoRolScreen({ navigation, route }) {
  const { misterio } = route.params;

  const RolCard = ({ emoji, titulo, subtitulo, descripcion, rol, accent }) => (
    <TouchableOpacity
      style={[styles.card, accent && styles.cardAccent]}
      activeOpacity={0.75}
      onPress={() => navigation.navigate('Rezo', { mode: 'grupo', rol, misterio })}
    >
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={[styles.cardTitulo, accent && styles.cardTituloAccent]}>{titulo}</Text>
      <Text style={styles.cardSubtitulo}>{subtitulo}</Text>
      <Text style={styles.cardDesc}>{descripcion}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>¿Cuál es{'\n'}tu papel?</Text>

        <View style={styles.cards}>
          <RolCard
            emoji="👤"
            titulo="SOY EL LÍDER"
            subtitulo="Dirijo la oración"
            descripcion="Verás el texto que debes decir y el botón para avanzar."
            rol="lider"
            accent
          />
          <RolCard
            emoji="👥"
            titulo="SOY DEL GRUPO"
            subtitulo="Rezo con otros"
            descripcion="Verás tu parte de la oración en grande y clara."
            rol="grupo"
          />
        </View>

        <View style={styles.tip}>
          <Text style={styles.tipText}>
            💡 El líder controla el avance. El grupo solo lee su respuesta.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 64,
    paddingBottom: SPACING.xxl,
    gap: SPACING.xl,
  },
  backBtn: { alignSelf: 'flex-start' },
  back: { color: COLORS.textMuted, fontSize: FONTS.size.md },
  titulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    lineHeight: FONTS.size.xxl * 1.4,
  },
  cards: { gap: SPACING.md },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
    minHeight: 170,
    justifyContent: 'center',
  },
  cardAccent: { borderColor: COLORS.gold },
  cardEmoji: { fontSize: 40 },
  cardTitulo: {
    fontSize: FONTS.size.xl,
    color: COLORS.textPrimary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardTituloAccent: { color: COLORS.gold },
  cardSubtitulo: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
  },
  cardDesc: {
    fontSize: FONTS.size.md,
    color: COLORS.textMuted,
    lineHeight: FONTS.size.md * 1.6,
  },
  tip: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  tipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    lineHeight: FONTS.size.md * 1.6,
  },
});
