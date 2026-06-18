import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(particle1, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ]),
      Animated.timing(tagOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(particle2, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(particle3, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('FirstTime');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.bgDark, '#2A1A3E', '#1A1A2E']}
      style={styles.container}
    >
      <Animated.Text style={[styles.particle, styles.p1, { opacity: particle1 }]}>✦</Animated.Text>
      <Animated.Text style={[styles.particle, styles.p2, { opacity: particle2 }]}>✦</Animated.Text>
      <Animated.Text style={[styles.particle, styles.p3, { opacity: particle3 }]}>✦</Animated.Text>

      <Animated.View style={[styles.center, { opacity: logoOpacity }]}>
        <Text style={styles.logo}>C O R O N A</Text>
        <View style={styles.divider} />
        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          Reza. Respira. Encuentra paz.
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.gold,
    letterSpacing: 8,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.gold,
    opacity: 0.4,
    marginVertical: SPACING.md,
  },
  tagline: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  particle: {
    position: 'absolute',
    color: COLORS.gold,
    fontSize: 18,
    opacity: 0.6,
  },
  p1: { top: '30%', left: '30%' },
  p2: { top: '28%', left: '55%' },
  p3: { top: '35%', right: '25%' },
});
