import { useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';

// Speaks `text` in Spanish whenever `enabled` is true and `text` changes.
// Stops speech on disable or unmount.
export function useSpeech(text, enabled) {
  const lastText = useRef(null);

  useEffect(() => {
    if (!enabled || !text) {
      Speech.stop();
      return;
    }
    // Avoid re-speaking the same text (e.g. re-renders without step change)
    if (text === lastText.current) return;
    lastText.current = text;

    Speech.stop();
    Speech.speak(text, {
      language: 'es-MX',
      pitch: 1.0,
      rate: 0.88,
    });
  }, [text, enabled]);

  useEffect(() => {
    return () => Speech.stop();
  }, []);
}
