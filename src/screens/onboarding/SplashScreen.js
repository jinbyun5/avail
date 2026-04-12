import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors, text } from '../../styles/Appstyles';

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
    backgroundColor: colors.primary.teal900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: colors.primary.teal500,
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
    color: colors.primary.teal300,
  },
});
