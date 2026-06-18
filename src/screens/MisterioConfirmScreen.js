import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import GoldButton from '../components/GoldButton';
import { getMisterioDelDia, getDiaNombre, MISTERIOS } from '../data/rosario';

export default function MisterioConfirmScreen({ navigation, route }) {
  const { mode } = route.params;
  const dia = getDiaNombre();
  const [misterio, setMisterio] = useState(getMisterioDelDia());
  const [showPicker, setShowPicker] = useState(false);

  const opciones = Object.values(MISTERIOS);

  if (showPicker) {
    return (
      <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
        <View style={styles.pickerContent}>
          <Text style={styles.pickerTitle}>Seleccionar Misterio</Text>
          <ScrollView style={styles.pickerList}>
            {opciones.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.pickerItem, misterio.id === m.id && styles.pickerItemActive]}
                onPress={() => { setMisterio(m); setShowPicker(false); }}
              >
                <Text style={styles.pickerEmoji}>{m.emoji}</Text>
                <View>
                  <Text style={[styles.pickerNombre, misterio.id === m.id && styles.pickerNombreActive]}>
                    Misterios {m.nombre}
                  </Text>
                  <Text style={styles.pickerDesc}>{m.descripcion.slice(0, 45)}...</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.pickerCancel}>
            <Text style={styles.pickerCancelText}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[COLORS.bgDark, '#2A1A3E']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mode === 'solo' ? '🧘 Solo' : '👨‍👩‍👧 Grupo'}</Text>
          </View>
        </View>

        <Text style={styles.dia}>Hoy es {dia}</Text>

        <View style={styles.misterioCard}>
          <Text style={styles.misterioEmoji}>{misterio.emoji}</Text>
          <Text style={styles.misterioLabel}>Misterios</Text>
          <Text style={styles.misterioNombre}>{misterio.nombre}</Text>
          <Text style={styles.misterioDesc}>{misterio.descripcion}</Text>

          <View style={styles.listaDivider} />

          {misterio.lista.map((m) => (
            <View key={m.numero} style={styles.misterioListaItem}>
              <Text style={styles.misterioListaNum}>{m.numero}.</Text>
              <Text style={styles.misterioListaNombre}>{m.nombre}</Text>
            </View>
          ))}
        </View>

        <GoldButton
          title="Comenzar  →"
          onPress={() =>
            navigation.navigate(
              mode === 'grupo' ? 'GrupoSetup' : 'Rezo',
              { mode, misterio }
            )
          }
          style={styles.mainBtn}
          textStyle={{ fontSize: FONTS.size.xl }}
        />

        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.cambiarText}>Cambiar misterio</Text>
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
    paddingTop: 56,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: { color: COLORS.textMuted, fontSize: FONTS.size.md },
  badge: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.full,
    paddingVertical: 6,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  badgeText: { color: COLORS.textSecondary, fontSize: FONTS.size.sm },

  dia: {
    fontSize: FONTS.size.lg,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },

  misterioCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  misterioEmoji: { fontSize: 40, textAlign: 'center' },
  misterioLabel: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  misterioNombre: {
    fontSize: FONTS.size.xxxl,
    color: COLORS.gold,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  misterioDesc: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONTS.size.md * 1.6,
  },
  listaDivider: {
    height: 1,
    backgroundColor: '#3A3A60',
    marginVertical: SPACING.sm,
  },
  misterioListaItem: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'flex-start',
  },
  misterioListaNum: {
    color: COLORS.gold,
    fontSize: FONTS.size.md,
    fontWeight: '700',
    width: 20,
  },
  misterioListaNombre: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.md,
    flex: 1,
  },

  mainBtn: { width: '100%' },
  cambiarText: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.md,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // Picker
  pickerContent: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  pickerTitle: {
    fontSize: FONTS.size.xxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    marginBottom: SPACING.sm,
  },
  pickerList: { flex: 1 },
  pickerItem: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  pickerItemActive: { borderColor: COLORS.gold },
  pickerEmoji: { fontSize: 32 },
  pickerNombre: { fontSize: FONTS.size.lg, color: COLORS.textPrimary, fontWeight: '600' },
  pickerNombreActive: { color: COLORS.gold },
  pickerDesc: { fontSize: FONTS.size.sm, color: COLORS.textMuted, marginTop: 2 },
  pickerCancel: { padding: SPACING.md, alignItems: 'center' },
  pickerCancelText: { color: COLORS.textMuted, fontSize: FONTS.size.md },
});
