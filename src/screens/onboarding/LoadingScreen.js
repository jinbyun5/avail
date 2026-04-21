import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/Button';
import { buildPrompt } from '../../data/prompt';
import { colors, text } from '../../styles/Appstyles';

export default function LoadingScreen({ navigation, route }) {

  const answers = route.params?.answers || {};
  const [error, setError] = useState(false);

  const fetchBenefits = useCallback(async () => {
    setError(false);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          messages: [{ 
            role: 'user', 
            content: buildPrompt(answers) 
          }],
        }),
      });

      const data = await response.json();
      const raw = data.content[0].text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(raw);
      
      parsed.totalAnnualValue = parsed.benefits.reduce((sum, b) => {
        const match = b.amount.match(/\$([0-9,]+)/);
        return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
      }, 0);

      await AsyncStorage.setItem('benefits', JSON.stringify(parsed));
      await AsyncStorage.setItem('profile', JSON.stringify(answers));

      navigation.navigate('MainTabs');
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchBenefits();
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
        {error ? (
          <>
            <Text style={[text.bodyReg, styles.loadingText]}>
              Something went wrong.{'\n'}Please try again.
            </Text>
            <Button
              label="Reload"
              onPress={fetchBenefits}
              style={{ marginTop: 24, paddingHorizontal: 40 }}
            />
          </>
        ) : (
          <>
            <ActivityIndicator
              size={64}
              color={colors.primary.teal300}
              style={styles.spinner}
            />
            <Text style={[text.bodyReg, styles.loadingText]}>
              Matching your profile{'\n'}against BC student grants{'\n'}and programs
            </Text>
          </>
        )}
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