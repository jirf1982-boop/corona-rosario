import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from '../constants/theme';

export default function ModeSelectScreen({ navigation }) {
  const Card = ({ emoji, titulo, subtitulo, detalle, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      <Text style={styles.cardSubtitulo}>{subtitulo}</Text>
      <Text style={styles.cardDetalle}>{detalle}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>¿Cómo quieres{'\n'}rezar hoy?</Text>

        <View style={styles.cards}>
          <Card
            emoji="🧘"
            titulo="SOLO"
            subtitulo="A tu ritmo, en paz"
            detalle="Música suave · Vibración al avanzar"
            onPress={() => navigation.navigate('MisterioConfirm', { mode: 'solo' })}
          />

          <Card
            emoji="👨‍👩‍👧"
            titulo="EN GRUPO"
            subtitulo="Para familia o iglesia"
            detalle="Divide líder y respuestas · Pantalla grande"
            onPress={() => navigation.navigate('MisterioConfirm', { mode: 'grupo' })}
          />
        </View>

        <TouchableOpacity
          style={styles.btnAprender}
          onPress={() => navigation.navigate('Aprender')}
        >
          <Text style={styles.btnAprenderText}>📖  Primero quiero aprender</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 80,
    paddingBottom: SPACING.xxl,
    gap: SPACING.xl,
    alignItems: 'center',
  },
  titulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: FONTS.size.xxl * 1.4,
  },
  cards: {
    width: '100%',
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
    minHeight: 160,
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 44 },
  cardTitulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.gold,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardSubtitulo: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  cardDetalle: {
    fontSize: FONTS.size.md,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  btnAprender: {
    borderWidth: 1,
    borderColor: '#3A3A60',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    width: '100%',
    alignItems: 'center',
  },
  btnAprenderText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
  },
  back: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.md,
    marginTop: SPACING.sm,
  },
});
