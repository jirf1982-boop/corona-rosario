import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from '../constants/theme';
import GoldButton from '../components/GoldButton';

export default function FirstTimeScreen({ navigation }) {
  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🌹</Text>
        <Text style={styles.greeting}>Hola, bienvenido</Text>
        <Text style={styles.question}>¿Ya sabes cómo{'\n'}rezar el Rosario?</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btnSecondary}
            activeOpacity={0.7}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.btnSecondaryText}>Sí, ya sé rezarlo</Text>
          </TouchableOpacity>

          <GoldButton
            title="No, es mi primera vez  →"
            onPress={() => navigation.navigate('Tutorial')}
            style={styles.btnPrimary}
          />
        </View>

        <Text style={styles.note}>
          No necesitas memorizar nada.{'\n'}La app te guía en todo momento.
        </Text>
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
    gap: SPACING.lg,
  },
  emoji: { fontSize: 52 },
  greeting: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  question: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: FONTS.size.xxl * 1.4,
  },
  buttons: {
    width: '100%',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    minHeight: 64,
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: COLORS.gold,
    fontSize: FONTS.size.lg,
    fontWeight: '500',
  },
  btnPrimary: { width: '100%' },
  note: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: FONTS.size.sm * 1.8,
    marginTop: SPACING.sm,
  },
});
