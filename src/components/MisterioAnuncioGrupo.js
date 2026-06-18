import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import GoldButton from './GoldButton';

const ORDINALS = ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto'];

export default function MisterioAnuncioGrupo({ step, esLider, onContinuar, topBar }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, useNativeDriver: true, tension: 50, friction: 8 }),
    ]).start();
  }, [step.numero]);

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      {topBar}

      <Animated.View style={[styles.content, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
        <Text style={styles.star}>✦</Text>

        <Text style={styles.ordinal}>
          {ORDINALS[step.numero - 1]} Misterio
        </Text>
        <Text style={styles.tipo}>{step.tipoMisterio?.toUpperCase()}</Text>

        <View style={styles.divider} />

        <Text style={styles.nombre}>{step.misterio.nombre}</Text>

        <View style={styles.meditacionCard}>
          <Text style={styles.meditacionTexto}>{step.misterio.meditacion}</Text>
        </View>

        {/* Indicador de rol */}
        <View style={styles.rolIndicador}>
          <Text style={styles.rolTexto}>
            {esLider
              ? '👤 Anuncia este misterio al grupo'
              : '🙏 Escucha al líder y medita'}
          </Text>
        </View>
      </Animated.View>

      {/* Solo el líder puede avanzar */}
      <View style={styles.footer}>
        {esLider ? (
          <GoldButton title="Continuar  →" onPress={onContinuar} style={styles.btn} />
        ) : (
          <View style={styles.esperandoBox}>
            <Animated.View style={[styles.esperandoDot, { opacity: fadeIn }]} />
            <Text style={styles.esperandoText}>El líder continúa cuando estén listos</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  star: { fontSize: 28, color: COLORS.gold },
  ordinal: { fontSize: FONTS.size.md, color: COLORS.textMuted, letterSpacing: 2 },
  tipo: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    letterSpacing: 3,
    fontWeight: '300',
  },
  divider: { width: 40, height: 1, backgroundColor: COLORS.gold, opacity: 0.4 },
  nombre: {
    fontSize: FONTS.size.xxxl,
    color: COLORS.gold,
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: FONTS.size.xxxl * 1.3,
  },
  meditacionCard: {
    backgroundColor: '#242440',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  meditacionTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: FONTS.size.lg * 1.75,
    fontFamily: 'serif',
  },
  rolIndicador: {
    backgroundColor: '#1A1A2E',
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  rolTexto: { color: COLORS.textMuted, fontSize: FONTS.size.sm },
  footer: { padding: SPACING.lg, paddingBottom: 36 },
  btn: { width: '100%' },
  esperandoBox: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#3A3A60',
    borderStyle: 'dashed',
  },
  esperandoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.violetLight },
  esperandoText: { color: COLORS.textMuted, fontSize: FONTS.size.md },
});
