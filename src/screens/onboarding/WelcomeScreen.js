import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, text } from '../../styles/Appstyles';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  'Takes under 2 minutes',
  'No account required',
  'Results stay on your device',
];

// ─── Screen ───────────────────────────────────────────────────────────────────
// Wire onGetStarted to the first quiz screen once the onboarding flow is connected.

export default function WelcomeScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>

      {/* ── Content ── */}
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../../assets/iconAlt.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[text.h1, styles.headline]}>
          Find student benefits you didn't know existed.
        </Text>

        <Text style={[text.bodyReg, styles.body]}>
          You're a BC student. There are grants, credits, and programs with your name on them. Answer 5 quick questions and we'll show you what you may qualify for.
        </Text>

        <View style={styles.features}>
          {FEATURES.map(feature => (
            <View key={feature} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={24} color={colors.brand.accent} />
              <Text style={[text.bodyReg, styles.featureText]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        {/* Wire onPress to Quiz1Screen later */}
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={[text.bodyMed, styles.buttonText]}>Get started</Text>
        </Pressable>

        <Text style={[text.label, styles.disclaimer]}>
          Results for informational purposes only
        </Text>
      </View>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.cardInputNav,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.brand.hoverLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 40,
    height: 40,
  },
  headline: {
    color: colors.neutral.primaryText,
    marginBottom: 16,
  },
  body: {
    color: colors.neutral.secondaryText,
    marginBottom: 32,
  },

  // Feature list
  features: {
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    color: colors.neutral.primaryText,
    flex: 1,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.brand.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPressed: {
    backgroundColor: colors.brand.pressed,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  disclaimer: {
    color: colors.neutral.secondaryText,
    textAlign: 'center',
  },
});
