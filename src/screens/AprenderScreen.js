import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { ORACIONES, MISTERIOS } from '../data/rosario';
import GoldButton from '../components/GoldButton';

// ─── DATA ────────────────────────────────────────────────────────────────────

const CAPITULOS = [
  { id: 'que_es', emoji: '📿', titulo: '¿Qué es el Rosario?' },
  { id: 'oraciones', emoji: '🙏', titulo: 'Las Oraciones' },
  { id: 'misterios', emoji: '✨', titulo: 'Los Misterios' },
  { id: 'orden', emoji: '🗺️', titulo: 'El Orden del Rosario' },
  { id: 'faq', emoji: '💬', titulo: 'Preguntas frecuentes' },
];

const DIAS_MISTERIOS = [
  { dia: 'Lunes', tipo: 'gozosos', corto: 'L' },
  { dia: 'Martes', tipo: 'dolorosos', corto: 'Ma' },
  { dia: 'Miércoles', tipo: 'gloriosos', corto: 'Mi' },
  { dia: 'Jueves', tipo: 'luminosos', corto: 'J' },
  { dia: 'Viernes', tipo: 'dolorosos', corto: 'V' },
  { dia: 'Sábado', tipo: 'gozosos', corto: 'S' },
  { dia: 'Domingo', tipo: 'gloriosos', corto: 'D' },
];

const FAQ = [
  {
    q: '¿Cuánto tiempo tarda rezar el Rosario?',
    a: 'Entre 15 y 25 minutos. Sin prisa, con devoción. La app te guía a tu propio ritmo.',
  },
  {
    q: '¿Tengo que memorizar las oraciones?',
    a: 'No. La app muestra el texto completo de cada oración. Puedes leer directamente de la pantalla.',
  },
  {
    q: '¿Puedo rezarlo aunque nunca lo haya hecho?',
    a: 'Sí, completamente. El Modo Guiado te lleva paso a paso sin que necesites saber nada de antemano.',
  },
  {
    q: '¿Qué son los Misterios?',
    a: 'Son 20 momentos de la vida de Jesús y María. Mientras rezas el Ave María, meditas en uno de ellos. La app te dice cuál toca cada día.',
  },
  {
    q: '¿Puedo rezarlo en cualquier momento del día?',
    a: 'Sí. Muchos lo rezan por la mañana, en la noche, o durante un momento tranquilo. No hay hora incorrecta.',
  },
  {
    q: '¿Qué pasa si me interrumpen a mitad?',
    a: 'Puedes pausar y continuar. La app recuerda en qué oración ibas en la misma sesión.',
  },
];

const ORDEN_PASOS = [
  { num: 1, nombre: 'Señal de la Cruz', detalle: 'Para comenzar', color: COLORS.gold },
  { num: 2, nombre: 'Credo Apostólico', detalle: 'En el crucifijo', color: COLORS.gold },
  { num: 3, nombre: 'Padre Nuestro', detalle: 'Cuenta grande', color: '#60A0D0' },
  { num: 4, nombre: '3 Avemarías', detalle: 'Fe, Esperanza y Caridad', color: COLORS.violetLight },
  { num: 5, nombre: 'Gloria', detalle: 'Para cerrar', color: COLORS.successLight },
  { num: 0, nombre: '— Repite 5 veces —', detalle: 'Una por cada misterio', color: COLORS.textMuted, sep: true },
  { num: 6, nombre: 'Anunciar el Misterio', detalle: 'El líder lo declara', color: COLORS.gold },
  { num: 7, nombre: 'Padre Nuestro', detalle: 'Cuenta grande', color: '#60A0D0' },
  { num: 8, nombre: '10 Avemarías', detalle: 'Cuentas pequeñas', color: COLORS.violetLight },
  { num: 9, nombre: 'Gloria', detalle: '', color: COLORS.successLight },
  { num: 10, nombre: 'Oración de Fátima', detalle: 'Opcional', color: COLORS.textMuted },
  { num: 0, nombre: '— Al terminar —', detalle: '', color: COLORS.textMuted, sep: true },
  { num: 11, nombre: 'Salve Regina', detalle: 'Oración final', color: COLORS.gold },
];

// ─── SUB-COMPONENTES ──────────────────────────────────────────────────────────

function SeccionHeader({ cap, activa, onPress, completada }) {
  return (
    <TouchableOpacity style={styles.capHeader} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.capEmoji}>{cap.emoji}</Text>
      <Text style={[styles.capTitulo, activa && styles.capTituloActivo]}>{cap.titulo}</Text>
      <View style={styles.capRight}>
        {completada && <Text style={styles.checkmark}>✓</Text>}
        <Text style={styles.capArrow}>{activa ? '▲' : '▼'}</Text>
      </View>
    </TouchableOpacity>
  );
}

function OracionCard({ oracion }) {
  const [abierta, setAbierta] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    if (!abierta) {
      setAbierta(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start(() => setAbierta(false));
    }
  };

  const texto = oracion.texto || (oracion.lider + '\n\n' + oracion.grupo);

  return (
    <View style={styles.oracionCard}>
      <TouchableOpacity style={styles.oracionCardHeader} onPress={toggle} activeOpacity={0.75}>
        <View style={styles.oracionCardLeft}>
          <View style={styles.oracionDot} />
          <Text style={styles.oracionNombreCard}>{oracion.nombre}</Text>
        </View>
        <Text style={styles.oracionCardArrow}>{abierta ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {abierta && (
        <Animated.View style={[styles.oracionCardBody, { opacity: fadeAnim }]}>
          <Text style={styles.oracionCardTexto}>{texto}</Text>
        </Animated.View>
      )}
    </View>
  );
}

function MisterioGrupoCard({ misterio }) {
  const [abierto, setAbierto] = useState(false);
  const colorMapa = {
    gozosos: { bg: '#1A3A4A', border: '#2A6080', tag: '#4A9ABB' },
    luminosos: { bg: '#3A2A10', border: '#806020', tag: '#C09040' },
    dolorosos: { bg: '#3A1A1A', border: '#802020', tag: '#BB4040' },
    gloriosos: { bg: '#1A3A1A', border: '#206020', tag: '#40BB40' },
  };
  const c = colorMapa[misterio.id] || colorMapa.gozosos;
  const diasDelMisterio = DIAS_MISTERIOS.filter(d => d.tipo === misterio.id).map(d => d.dia);

  return (
    <View style={[styles.misterioCard, { backgroundColor: c.bg, borderColor: c.border }]}>
      <TouchableOpacity
        style={styles.misterioCardHeader}
        onPress={() => setAbierto(!abierto)}
        activeOpacity={0.75}
      >
        <Text style={styles.misterioEmoji}>{misterio.emoji}</Text>
        <View style={styles.misterioCardCenter}>
          <Text style={[styles.misterioNombreCard, { color: c.tag }]}>
            Misterios {misterio.nombre}
          </Text>
          <Text style={styles.misterioDiasText}>{diasDelMisterio.join(' · ')}</Text>
        </View>
        <Text style={styles.capArrow}>{abierto ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {abierto && (
        <View style={styles.misterioListaBody}>
          <Text style={styles.misterioDescCard}>{misterio.descripcion}</Text>
          {misterio.lista.map((m) => (
            <View key={m.numero} style={styles.misterioItem}>
              <View style={[styles.misterioItemNum, { backgroundColor: c.tag }]}>
                <Text style={styles.misterioItemNumText}>{m.numero}</Text>
              </View>
              <View style={styles.misterioItemBody}>
                <Text style={styles.misterioItemNombre}>{m.nombre}</Text>
                <Text style={styles.misterioItemMeditacion}>{m.meditacion}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function FaqItem({ item }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setAbierta(!abierta)}
      activeOpacity={0.75}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQ}>{item.q}</Text>
        <Text style={styles.capArrow}>{abierta ? '▲' : '▼'}</Text>
      </View>
      {abierta && <Text style={styles.faqA}>{item.a}</Text>}
    </TouchableOpacity>
  );
}

// ─── PANTALLA PRINCIPAL ───────────────────────────────────────────────────────

export default function AprenderScreen({ navigation }) {
  const [capActiva, setCapActiva] = useState('que_es');
  const [completadas, setCompletadas] = useState(new Set());

  const marcarCompletada = (id) => {
    setCompletadas(prev => new Set([...prev, id]));
  };

  const toggleCap = (id) => {
    setCapActiva(capActiva === id ? null : id);
    if (id !== capActiva) marcarCompletada(id);
  };

  return (
    <LinearGradient colors={[COLORS.bgDark, '#1E1A30']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Aprender el{'\n'}Rosario</Text>
        <Text style={styles.subtitulo}>
          Todo explicado con calma. Sin prisa.
        </Text>
        {/* Progress pills */}
        <View style={styles.progressPills}>
          {CAPITULOS.map(c => (
            <View
              key={c.id}
              style={[styles.pill, completadas.has(c.id) && styles.pillDone]}
            />
          ))}
          <Text style={styles.progressText}>
            {completadas.size}/{CAPITULOS.length} secciones
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 1. QUÉ ES EL ROSARIO ─────────────────────────────── */}
        <View style={styles.capCard}>
          <SeccionHeader
            cap={CAPITULOS[0]}
            activa={capActiva === 'que_es'}
            onPress={() => toggleCap('que_es')}
            completada={completadas.has('que_es')}
          />
          {capActiva === 'que_es' && (
            <View style={styles.capBody}>
              <Text style={styles.capTexto}>
                El Rosario es una de las oraciones más antiguas y queridas del
                catolicismo. Se reza con un collar de cuentas que guía el orden.
              </Text>

              {/* Diagrama visual simple */}
              <View style={styles.diagramaCard}>
                <Text style={styles.diagramaTitulo}>El rosario tiene:</Text>
                <View style={styles.diagramaFila}>
                  <View style={[styles.diagramaTag, { backgroundColor: '#1A3040' }]}>
                    <Text style={styles.diagramaNum}>1</Text>
                    <Text style={styles.diagramaLabel}>Crucifijo</Text>
                  </View>
                  <View style={[styles.diagramaTag, { backgroundColor: '#2A2040' }]}>
                    <Text style={styles.diagramaNum}>5</Text>
                    <Text style={styles.diagramaLabel}>Cuentas grandes</Text>
                  </View>
                  <View style={[styles.diagramaTag, { backgroundColor: '#1A2A40' }]}>
                    <Text style={styles.diagramaNum}>50</Text>
                    <Text style={styles.diagramaLabel}>Cuentas pequeñas</Text>
                  </View>
                </View>

                <View style={styles.diagramaDivider} />

                <Text style={styles.diagramaTitulo}>Cada cuenta = una oración:</Text>
                <View style={styles.diagramaFila}>
                  <View style={[styles.diagramaTag, { backgroundColor: '#1A3040' }]}>
                    <Text style={styles.diagramaLabel}>Cuenta grande</Text>
                    <Text style={styles.diagramaOra}>Padre Nuestro</Text>
                  </View>
                  <View style={[styles.diagramaTag, { backgroundColor: '#2A1A40' }]}>
                    <Text style={styles.diagramaLabel}>Cuenta pequeña</Text>
                    <Text style={styles.diagramaOra}>Ave María</Text>
                  </View>
                </View>
              </View>

              <View style={styles.destacadoBox}>
                <Text style={styles.destacadoTexto}>
                  💡 No necesitas un rosario físico. Esta app es tu guía completa.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ── 2. LAS ORACIONES ─────────────────────────────────── */}
        <View style={styles.capCard}>
          <SeccionHeader
            cap={CAPITULOS[1]}
            activa={capActiva === 'oraciones'}
            onPress={() => toggleCap('oraciones')}
            completada={completadas.has('oraciones')}
          />
          {capActiva === 'oraciones' && (
            <View style={styles.capBody}>
              <Text style={styles.capTexto}>
                Toca cada oración para ver su texto completo. No necesitas
                memorizarlas — la app siempre las muestra.
              </Text>
              {Object.values(ORACIONES).map((o) => (
                <OracionCard key={o.id} oracion={o} />
              ))}
            </View>
          )}
        </View>

        {/* ── 3. LOS MISTERIOS ─────────────────────────────────── */}
        <View style={styles.capCard}>
          <SeccionHeader
            cap={CAPITULOS[2]}
            activa={capActiva === 'misterios'}
            onPress={() => toggleCap('misterios')}
            completada={completadas.has('misterios')}
          />
          {capActiva === 'misterios' && (
            <View style={styles.capBody}>
              <Text style={styles.capTexto}>
                Mientras rezas el Ave María, meditas en un momento especial de la vida
                de Jesús o María. Estos se llaman "Misterios".
              </Text>

              {/* Calendario visual */}
              <View style={styles.calendarioCard}>
                <Text style={styles.calendarioTitulo}>¿Cuándo se reza cada uno?</Text>
                <View style={styles.calendarioGrid}>
                  {DIAS_MISTERIOS.map((d) => {
                    const m = MISTERIOS[d.tipo];
                    const colorMapa = {
                      gozosos: '#4A9ABB', luminosos: '#C09040',
                      dolorosos: '#BB4040', gloriosos: '#40BB40',
                    };
                    return (
                      <View key={d.dia} style={styles.calendarioDia}>
                        <Text style={styles.calendarioDiaNombre}>{d.corto}</Text>
                        <View style={[styles.calendarioDot, { backgroundColor: colorMapa[d.tipo] }]} />
                        <Text style={[styles.calendarioTipo, { color: colorMapa[d.tipo] }]}>
                          {m.nombre.slice(0, 3)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.leyendaFila}>
                  {Object.values(MISTERIOS).map(m => {
                    const colorMapa = {
                      gozosos: '#4A9ABB', luminosos: '#C09040',
                      dolorosos: '#BB4040', gloriosos: '#40BB40',
                    };
                    return (
                      <View key={m.id} style={styles.leyendaItem}>
                        <View style={[styles.leyendaDot, { backgroundColor: colorMapa[m.id] }]} />
                        <Text style={styles.leyendaTexto}>{m.nombre}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Accordions por grupo */}
              {Object.values(MISTERIOS).map(m => (
                <MisterioGrupoCard key={m.id} misterio={m} />
              ))}
            </View>
          )}
        </View>

        {/* ── 4. EL ORDEN ──────────────────────────────────────── */}
        <View style={styles.capCard}>
          <SeccionHeader
            cap={CAPITULOS[3]}
            activa={capActiva === 'orden'}
            onPress={() => toggleCap('orden')}
            completada={completadas.has('orden')}
          />
          {capActiva === 'orden' && (
            <View style={styles.capBody}>
              <Text style={styles.capTexto}>
                El Rosario siempre sigue el mismo orden. La app lo gestiona
                automáticamente — solo tienes que rezar.
              </Text>

              <View style={styles.ordenLista}>
                {ORDEN_PASOS.map((paso, i) => {
                  if (paso.sep) {
                    return (
                      <View key={i} style={styles.ordenSep}>
                        <View style={styles.ordenSepLine} />
                        <Text style={styles.ordenSepTexto}>{paso.nombre}</Text>
                        <View style={styles.ordenSepLine} />
                      </View>
                    );
                  }
                  return (
                    <View key={i} style={styles.ordenPaso}>
                      <View style={[styles.ordenLinea, { backgroundColor: paso.color + '40' }]} />
                      <View style={[styles.ordenCirculo, { borderColor: paso.color }]}>
                        <Text style={[styles.ordenNum, { color: paso.color }]}>{paso.num}</Text>
                      </View>
                      <View style={styles.ordenTexto}>
                        <Text style={styles.ordenNombre}>{paso.nombre}</Text>
                        {paso.detalle ? (
                          <Text style={styles.ordenDetalle}>{paso.detalle}</Text>
                        ) : null}
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.destacadoBox}>
                <Text style={styles.destacadoTexto}>
                  ✨ En total: 79 pasos. La app los completa todos por ti, en orden.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ── 5. FAQ ───────────────────────────────────────────── */}
        <View style={styles.capCard}>
          <SeccionHeader
            cap={CAPITULOS[4]}
            activa={capActiva === 'faq'}
            onPress={() => toggleCap('faq')}
            completada={completadas.has('faq')}
          />
          {capActiva === 'faq' && (
            <View style={styles.capBody}>
              {FAQ.map((item, i) => (
                <FaqItem key={i} item={item} />
              ))}
            </View>
          )}
        </View>

        {/* CTA final */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaEmoji}>🌹</Text>
          <Text style={styles.ctaTitulo}>¿Listo para rezar?</Text>
          <Text style={styles.ctaSubtitulo}>
            La app te guía en cada paso. No necesitas saber nada más.
          </Text>
          <GoldButton
            title="Comenzar el Rosario  →"
            onPress={() => navigation.navigate('ModeSelect')}
            style={styles.ctaBtn}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 56,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E50',
    gap: SPACING.sm,
  },
  backBtn: { marginBottom: SPACING.xs },
  back: { color: COLORS.textMuted, fontSize: FONTS.size.md },
  titulo: {
    fontSize: FONTS.size.xxxl,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    lineHeight: FONTS.size.xxxl * 1.2,
  },
  subtitulo: { fontSize: FONTS.size.md, color: COLORS.textSecondary },
  progressPills: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.xs },
  pill: { width: 28, height: 4, borderRadius: 2, backgroundColor: '#3A3A60' },
  pillDone: { backgroundColor: COLORS.gold },
  progressText: { fontSize: FONTS.size.xs, color: COLORS.textMuted, marginLeft: SPACING.xs },

  scroll: { flex: 1 },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxl * 2,
  },

  // ── Capítulos ──
  capCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  capHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  capEmoji: { fontSize: 22 },
  capTitulo: { flex: 1, fontSize: FONTS.size.lg, color: COLORS.textSecondary, fontWeight: '600' },
  capTituloActivo: { color: COLORS.textPrimary },
  capRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  checkmark: { color: COLORS.success, fontSize: FONTS.size.md, fontWeight: '700' },
  capArrow: { color: COLORS.textMuted, fontSize: 11 },

  capBody: {
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#2E2E50',
  },
  capTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.lg * 1.7,
  },

  // ── Diagrama ──
  diagramaCard: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: '#2E2E50',
  },
  diagramaTitulo: { fontSize: FONTS.size.sm, color: COLORS.textMuted, letterSpacing: 1 },
  diagramaFila: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap' },
  diagramaTag: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    flex: 1,
    minWidth: 80,
    gap: 4,
  },
  diagramaNum: { fontSize: FONTS.size.xxl, color: COLORS.gold, fontWeight: '700' },
  diagramaLabel: { fontSize: FONTS.size.xs, color: COLORS.textSecondary, textAlign: 'center' },
  diagramaOra: { fontSize: FONTS.size.sm, color: COLORS.textPrimary, fontWeight: '600', textAlign: 'center' },
  diagramaDivider: { height: 1, backgroundColor: '#2E2E50' },

  destacadoBox: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  destacadoTexto: { fontSize: FONTS.size.md, color: COLORS.textSecondary, lineHeight: FONTS.size.md * 1.6 },

  // ── Oraciones ──
  oracionCard: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3A3A60',
  },
  oracionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  oracionCardLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  oracionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gold },
  oracionNombreCard: { fontSize: FONTS.size.md, color: COLORS.gold, fontWeight: '600' },
  oracionCardArrow: { color: COLORS.textMuted, fontSize: 11 },
  oracionCardBody: {
    padding: SPACING.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#2E2E50',
  },
  oracionCardTexto: {
    fontSize: FONTS.size.lg,
    color: COLORS.textPrimary,
    lineHeight: FONTS.size.lg * 1.85,
    fontFamily: 'serif',
    paddingTop: SPACING.md,
  },

  // ── Misterios ──
  calendarioCard: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: '#2E2E50',
  },
  calendarioTitulo: { fontSize: FONTS.size.sm, color: COLORS.textMuted, letterSpacing: 1 },
  calendarioGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  calendarioDia: { alignItems: 'center', gap: 4, flex: 1 },
  calendarioDiaNombre: { fontSize: FONTS.size.xs, color: COLORS.textMuted, fontWeight: '700' },
  calendarioDot: { width: 10, height: 10, borderRadius: 5 },
  calendarioTipo: { fontSize: 9, fontWeight: '700' },
  leyendaFila: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  leyendaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  leyendaDot: { width: 8, height: 8, borderRadius: 4 },
  leyendaTexto: { fontSize: FONTS.size.xs, color: COLORS.textMuted },

  misterioCard: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  misterioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  misterioEmoji: { fontSize: 24 },
  misterioCardCenter: { flex: 1 },
  misterioNombreCard: { fontSize: FONTS.size.md, fontWeight: '700' },
  misterioDiasText: { fontSize: FONTS.size.xs, color: COLORS.textMuted, marginTop: 2 },
  misterioListaBody: { padding: SPACING.md, paddingTop: 0, gap: SPACING.md },
  misterioDescCard: {
    fontSize: FONTS.size.md,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.md * 1.6,
    fontStyle: 'italic',
    marginBottom: SPACING.xs,
  },
  misterioItem: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start' },
  misterioItemNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  misterioItemNumText: { color: '#fff', fontSize: FONTS.size.sm, fontWeight: '700' },
  misterioItemBody: { flex: 1 },
  misterioItemNombre: { fontSize: FONTS.size.md, color: COLORS.textPrimary, fontWeight: '600' },
  misterioItemMeditacion: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    lineHeight: FONTS.size.sm * 1.6,
    marginTop: 2,
  },

  // ── Orden ──
  ordenLista: { gap: 0 },
  ordenSep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  ordenSepLine: { flex: 1, height: 1, backgroundColor: '#3A3A60' },
  ordenSepTexto: { fontSize: FONTS.size.xs, color: COLORS.textMuted, letterSpacing: 1 },
  ordenPaso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    position: 'relative',
  },
  ordenLinea: {
    position: 'absolute',
    left: 13,
    top: 30,
    bottom: -8,
    width: 2,
  },
  ordenCirculo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgDark,
    flexShrink: 0,
    marginTop: 2,
  },
  ordenNum: { fontSize: 11, fontWeight: '800' },
  ordenTexto: { flex: 1, paddingTop: 2 },
  ordenNombre: { fontSize: FONTS.size.md, color: COLORS.textPrimary, fontWeight: '600' },
  ordenDetalle: { fontSize: FONTS.size.sm, color: COLORS.textMuted, marginTop: 2 },

  // ── FAQ ──
  faqItem: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#2E2E50',
  },
  faqHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: SPACING.sm },
  faqQ: { flex: 1, fontSize: FONTS.size.md, color: COLORS.textPrimary, fontWeight: '600', lineHeight: FONTS.size.md * 1.5 },
  faqA: { fontSize: FONTS.size.md, color: COLORS.textSecondary, lineHeight: FONTS.size.md * 1.7 },

  // ── CTA ──
  ctaCard: {
    backgroundColor: '#1A1A30',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gold + '40',
    marginTop: SPACING.md,
  },
  ctaEmoji: { fontSize: 40 },
  ctaTitulo: { fontSize: FONTS.size.xl, color: COLORS.textPrimary, fontFamily: 'serif', textAlign: 'center' },
  ctaSubtitulo: { fontSize: FONTS.size.md, color: COLORS.textSecondary, textAlign: 'center', lineHeight: FONTS.size.md * 1.6 },
  ctaBtn: { width: '100%' },
});
