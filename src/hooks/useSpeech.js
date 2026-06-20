import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export function useSpeech(text, enabled) {
  const lastText = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    const run = async () => {
      try {
        const Speech = await import('expo-speech');
        if (!enabled || !text) { Speech.stop(); return; }
        if (text === lastText.current) return;
        lastText.current = text;
        Speech.stop();
        Speech.speak(text, { language: 'es-MX', pitch: 1.0, rate: 0.88 });
      } catch (_) {}
    };
    run();
  }, [text, enabled]);

  useEffect(() => {
    return () => {
      if (Platform.OS === 'web') return;
      import('expo-speech').then(S => S.stop()).catch(() => {});
    };
  }, []);
}
