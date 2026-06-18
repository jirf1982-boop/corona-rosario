import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import GoldButton from '../components/GoldButton';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '📿',
    titulo: '¿Qué es el Rosario?',
    texto:
      'El Rosario es una oración especial que se reza con estas cuentas.\n\nCada cuenta representa una oración.\n\nLa app te dice cuál oración corresponde a cada cuenta.',
    destacado: 'No necesitas memorizar nada.',
  },
  {
    emoji: '👆',
    titulo: '¿Cómo funciona?',
    texto:
      'La app te guía paso a paso:',
    pasos: [
      'Aparece el texto de la oración',
      'Lees o escuchas la oración',
      'Tocas "Siguiente" para avanzar',
    ],
    destacado: 'La app nunca te deja solo.',
  },
  {
    emoji: '🌟',
    titulo: 'Los Misterios',
    texto:
      'Cada día se medita un "Misterio" diferente: un momento especial de la vida de Jesús y María.\n\nLa app detecta el día automáticamente y elige el Misterio correcto.',
    destacado: 'Solo tienes que rezar.',
  },
];

export default function TutorialScreen({ navigation }) {
  const [slide, setSlide] = useState(0);
  const scrollRef = useRef(null);

  const goTo = (idx) => {
    setSlide(idx);
    scrollRef.current?.scrollTo({ x: idx * width, animated: true });
  };

  const next = () => {
    if (slide < SLIDES.length - 1) {
      goTo(slide + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const s = SLIDES[slide];

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.skipText}>Saltar todo</Text>
      </TouchableOpacity>

      <View style={styles.counter}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === slide && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.slideContent}>
        <Text style={styles.emoji}>{s.emoji}</Text>
        <Text style={styles.titulo}>{s.titulo}</Text>

        <View style={styles.card}>
          <Text style={styles.texto}>{s.texto}</Text>

          {s.pasos && (
            <View style={styles.pasos}>
              {s.pasos.map((p, i) => (
                <View key={i} style={styles.paso}>
                  <View style={styles.pasoNum}>
                    <Text style={styles.pasoNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.pasoText}>{p}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.destacadoBox}>
            <Text style={styles.destacado}>{s.destacado}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <GoldButton
          title={slide < SLIDES.length - 1 ? 'Entendido  →' : '¡Estoy listo!'}
          onPress={next}
          style={styles.btn}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  skip: {
    position: 'absolute',
    top: 56,
    right: SPACING.lg,
    zIndex: 10,
    padding: SPACING.sm,
  },
  skipText: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.md,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 64,
    marginBottom: SPACING.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
  },
  dotActive: {
    backgroundColor: COLORS.gold,
    width: 20,
  },
  slideContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 56, marginBottom: SPACING.md },
  titulo: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    gap: SPACING.md,
  },
  texto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.lg * 1.7,
    textAlign: 'center',
  },
  pasos: { gap: SPACING.sm },
  paso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  pasoNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pasoNumText: {
    color: COLORS.bgDark,
    fontWeight: '700',
    fontSize: FONTS.size.md,
  },
  pasoText: {
    flex: 1,
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
  },
  destacadoBox: {
    backgroundColor: COLORS.bgMid,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  destacado: {
    fontSize: FONTS.size.lg,
    color: COLORS.gold,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  btn: { width: '100%' },
});
