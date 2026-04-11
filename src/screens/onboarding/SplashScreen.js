import { View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors, text } from '../../styles/Appstyles';

// ─── Screen ───────────────────────────────────────────────────────────────────
// Navigation to the next onboarding screen will be wired here once
// the onboarding flow is connected.

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.iconWrapper}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={[text.h1, styles.appName]}>Avail</Text>
      <Text style={[text.smallReg, styles.tagline]}>BC Student Benefits Finder</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: colors.brand.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  icon: {
    width: 64,
    height: 64,
  },
  appName: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    color: colors.brand.mutedOnDark,
  },
});
