import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

export default function ProgressBar({ progress = 0 }) {
  const pct = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.round(pct * 100)}%` }]} />
      </View>
      <Text style={styles.label}>{Math.round(pct * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.full,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.sm,
    minWidth: 32,
    textAlign: 'right',
  },
});
