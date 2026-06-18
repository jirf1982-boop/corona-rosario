import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

export default function GrupoLiderCard({ textoLider, textoGrupo, etiquetaLider, etiquetaGrupo, esLider }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [textoLider]);

  if (esLider) {
    return (
      <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
        {/* Bloque del líder */}
        <View style={styles.liderBlock}>
          <View style={styles.liderHeader}>
            <View style={styles.liderDot} />
            <Text style={styles.liderEtiqueta}>{etiquetaLider}</Text>
          </View>
          <Text style={styles.liderTexto}>{textoLider}</Text>
        </View>

        {/* Bloque del grupo (preview para el líder) */}
        {textoGrupo && (
          <View style={styles.grupoPreviewBlock}>
            <View style={styles.grupoHeader}>
              <View style={styles.grupoDot} />
              <Text style={styles.grupoEtiqueta}>{etiquetaGrupo}</Text>
            </View>
            <Text style={styles.grupoPreviewTexto}>{textoGrupo}</Text>
          </View>
        )}

        {/* Bloque único cuando todos rezan juntos */}
        {!textoGrupo && (
          <View style={styles.todosTag}>
            <Text style={styles.todosTagText}>👥 Todos rezan juntos</Text>
          </View>
        )}
      </Animated.View>
    );
  }

  // Vista participante
  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      {/* Qué dice el líder (pequeño, discreto) */}
      {textoLider && textoGrupo && (
        <View style={styles.liderSmallBlock}>
          <Text style={styles.liderSmallEtiqueta}>EL LÍDER DICE:</Text>
          <Text style={styles.liderSmallTexto}>{textoLider}</Text>
        </View>
      )}

      {/* Respuesta del participante (grande, prominente) */}
      {textoGrupo ? (
        <View style={styles.grupoMainBlock}>
          <View style={styles.grupoHeader}>
            <View style={styles.grupoDot} />
            <Text style={styles.grupoEtiqueta}>TÚ RESPONDES</Text>
          </View>
          <Text style={styles.grupoMainTexto}>{textoGrupo}</Text>
        </View>
      ) : (
        // Todos juntos — misma jerarquía
        <View style={styles.todosBlock}>
          <View style={styles.liderHeader}>
            <View style={styles.liderDot} />
            <Text style={styles.liderEtiqueta}>TODOS REZAN JUNTOS</Text>
          </View>
          <Text style={styles.liderTexto}>{textoLider}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: SPACING.md, flex: 1 },

  // --- LÍDER: bloque azul ---
  liderBlock: {
    backgroundColor: COLORS.leaderBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#2A5080',
  },
  liderHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  liderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#60A0D0' },
  liderEtiqueta: {
    fontSize: FONTS.size.xs,
    color: '#60A0D0',
    letterSpacing: 2,
    fontWeight: '700',
  },
  liderTexto: {
    fontSize: FONTS.size.xl,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.xl * 1.75,
    fontFamily: 'serif',
  },

  // --- LÍDER: preview del grupo ---
  grupoPreviewBlock: {
    backgroundColor: COLORS.groupBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#5A3A6A',
    opacity: 0.85,
  },
  grupoHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  grupoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.violetLight },
  grupoEtiqueta: {
    fontSize: FONTS.size.xs,
    color: COLORS.violetLight,
    letterSpacing: 2,
    fontWeight: '700',
  },
  grupoPreviewTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.lg * 1.7,
    fontFamily: 'serif',
  },

  // --- PARTICIPANTE: texto líder pequeño ---
  liderSmallBlock: {
    backgroundColor: '#1E1E3A',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.xs,
    opacity: 0.7,
  },
  liderSmallEtiqueta: {
    fontSize: FONTS.size.xs,
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  liderSmallTexto: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.md * 1.6,
    fontFamily: 'serif',
  },

  // --- PARTICIPANTE: respuesta GRANDE ---
  grupoMainBlock: {
    backgroundColor: COLORS.groupBg,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    gap: SPACING.md,
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.violetLight,
    justifyContent: 'center',
  },
  grupoMainTexto: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.xxl * 1.65,
    fontFamily: 'serif',
    textAlign: 'center',
  },

  // --- TODOS JUNTOS ---
  todosBlock: {
    backgroundColor: '#1E2A40',
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    gap: SPACING.sm,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A4060',
  },
  todosTag: {
    backgroundColor: '#1E2A40',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A4060',
    borderStyle: 'dashed',
  },
  todosTagText: { color: COLORS.textMuted, fontSize: FONTS.size.sm },
});
