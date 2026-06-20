import { Platform } from 'react-native';

export function lightImpact() {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
  import('expo-haptics').then(Haptics => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }).catch(() => {});
}
