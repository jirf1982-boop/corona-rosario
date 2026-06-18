import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function BeadRow({ total = 10, current = 0, done = 0, onBeadPress, large = false }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < done;
        const isActive = i === done && i < total;
        const size = large ? 22 : 14;

        return (
          <TouchableOpacity
            key={i}
            onPress={() => onBeadPress && onBeadPress(i)}
            activeOpacity={0.7}
            style={[
              styles.bead,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
              isDone && styles.beadDone,
              isActive && styles.beadActive,
              !isDone && !isActive && styles.beadInactive,
            ]}
          >
            {isActive && <View style={styles.beadGlow} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  bead: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadInactive: {
    backgroundColor: COLORS.beadInactive,
    borderWidth: 1,
    borderColor: '#4A4A70',
  },
  beadActive: {
    backgroundColor: COLORS.gold,
    transform: [{ scale: 1.3 }],
  },
  beadDone: {
    backgroundColor: COLORS.success,
  },
  beadGlow: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.gold,
    opacity: 0.25,
  },
});
