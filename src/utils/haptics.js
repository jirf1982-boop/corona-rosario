import * as Haptics from 'expo-haptics';

export function lightImpact() {
  if (typeof window !== 'undefined' && !window.ReactNativeWebView) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
