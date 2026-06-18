import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import GoldButton from '../components/GoldButton';
import { useStats } from '../hooks/useStats';

export default function FinScreen({ navigation }) {
  const checkScale = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;
  const { total, racha, registrarRosario } = useStats();

  useEffect(() => {
    registrarRosario();
    Animated.sequence([
      Animated.spring(checkScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
      Animated.timing(contentOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(statsOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={[COLORS.bgDark, '#1A2E1A', '#1A1A2E']} style={styles.container}>
      {/* Partículas */}
      <Text style={[styles.particle, styles.p1]}>✦</Text>
      <Text style={[styles.particle, styles.p2]}>✦</Text>
      <Text style={[styles.particle, styles.p3]}>✦</Text>

      <View style={styles.content}>
        {/* Check animado */}
        <Animated.View style={[styles.checkCircle, { transform: [{ scale: checkScale }] }]}>
          <Text style={styles.checkEmoji}>✓</Text>
        </Animated.View>

        <Animated.View style={[styles.textGroup, { opacity: contentOpacity }]}>
          <Text style={styles.titulo}>Rosario completo</Text>
          <View style={styles.cita}>
            <Text style={styles.citaTexto}>
              "Que la Virgen Maria interceda por ti\ny por tus intenciones."
            </Text>
          </View>
        </Animated.View>

        {/* Estadísticas */}
        <Animated.View style={[styles.stats, { opacity: statsOpacity }]}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{racha}</Text>
            <Text style={styles.statLabel}>días de racha</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>📿</Text>
            <Text style={styles.statValue}>{total}</Text>
            <Text style={styles.statLabel}>rosarios</Text>
          </View>
        </Animated.View>

        {/* Intención */}
        <TouchableOpacity style={styles.intencionBtn}>
          <Text style={styles.intencionText}>🕊  Agregar intención de oración</Text>
        </TouchableOpacity>

        {/* Volver */}
        <GoldButton
          title="Volver al inicio"
          onPress={() => navigation.replace('Home')}
          style={styles.homeBtn}
          secondary
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  particle: {
    position: 'absolute',
    color: COLORS.gold,
    fontSize: 20,
    opacity: 0.5,
  },
  p1: { top: '15%', left: '20%' },
  p2: { top: '12%', right: '25%' },
  p3: { top: '20%', left: '55%' },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.lg,
  },

  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  checkEmoji: { fontSize: 44, color: '#fff' },

  textGroup: { alignItems: 'center', gap: SPACING.md },
  titulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  cita: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    width: '100%',
  },
  citaTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: FONTS.size.lg * 1.7,
    fontStyle: 'italic',
  },

  stats: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  statItem: { alignItems: 'center', gap: 4, flex: 1 },
  statEmoji: { fontSize: 22 },
  statValue: { fontSize: FONTS.size.xl, color: COLORS.gold, fontWeight: '700' },
  statLabel: { fontSize: FONTS.size.xs, color: COLORS.textMuted, textAlign: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: '#3A3A60' },

  intencionBtn: {
    borderWidth: 1,
    borderColor: '#3A3A60',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    width: '100%',
    alignItems: 'center',
  },
  intencionText: { color: COLORS.textSecondary, fontSize: FONTS.size.md },

  homeBtn: { width: '100%' },
});
