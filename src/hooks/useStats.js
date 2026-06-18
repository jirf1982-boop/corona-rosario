import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_TOTAL = '@corona:total';
const KEY_DATES = '@corona:dates'; // JSON array of 'YYYY-MM-DD' strings

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

function calcularRacha(dates) {
  if (!dates.length) return 0;
  const sorted = [...new Set(dates)].sort().reverse();
  const today = hoy();
  // Si no rezó hoy ni ayer, racha = 0
  if (sorted[0] !== today) {
    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (sorted[0] !== ayer) return 0;
  }
  let racha = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev - curr) / 86400000;
    if (diff === 1) racha++;
    else break;
  }
  return racha;
}

export function useStats() {
  const [total, setTotal] = useState(0);
  const [racha, setRacha] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [t, d] = await AsyncStorage.multiGet([KEY_TOTAL, KEY_DATES]);
        const totalVal = parseInt(t[1] || '0', 10);
        const dates = JSON.parse(d[1] || '[]');
        setTotal(totalVal);
        setRacha(calcularRacha(dates));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const registrarRosario = useCallback(async () => {
    const [t, d] = await AsyncStorage.multiGet([KEY_TOTAL, KEY_DATES]);
    const newTotal = parseInt(t[1] || '0', 10) + 1;
    const dates = JSON.parse(d[1] || '[]');
    const newDates = [...dates, hoy()];
    await AsyncStorage.multiSet([
      [KEY_TOTAL, String(newTotal)],
      [KEY_DATES, JSON.stringify(newDates)],
    ]);
    setTotal(newTotal);
    setRacha(calcularRacha(newDates));
  }, []);

  return { total, racha, loading, registrarRosario };
}
