import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator } from 'react-native-paper';

import { colors, text } from '../../styles/Appstyles';

export default function LoadingScreen({ navigation, route }) {

  const answers = route.params?.answers || {};

  useEffect(() => {
    // Replace with Claude API call later
    const timer = setTimeout(() => {
      navigation.navigate('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      {/* Logo */}
      <View style={styles.logoRow}>
        <Image source={require('../../../assets/icon.png')} style={styles.logoIcon} />
        <Text style={[text.bodyMed, styles.logoLabel]}>Avail</Text>
      </View>

      {/* Center content */}
      <View style={styles.center}>
        <ActivityIndicator
          size={64}
          color={colors.primary.teal300}
          style={styles.spinner}
        />
        <Text style={[text.bodyReg, styles.loadingText]}>
          Matching your profile{'\n'}against BC student grants{'\n'}and programs
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.teal900,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 8,
  },
  logoLabel: {
    color: colors.primary.teal100,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 24,
  },
  loadingText: {
    color: colors.primary.teal300,
    textAlign: 'center',
  },
});