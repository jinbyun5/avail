import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioButton from '../../components/RadioButton';
import Button from '../../components/Button';

import { colors, text } from '../../styles/Appstyles';

// Quiz 1 — Study load
// Captures whether the student is studying full-time or part-time.
// Passes the answer forward to Quiz 2 via route params.
export default function Quiz1Screen({ navigation, route }) {

  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    navigation.navigate('Quiz2', { answers: { studyLoad: selected } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >

        {/* Logo */}
        <View style={styles.logoRow}>
          <Image source={require('../../../assets/icon.png')} style={styles.logoIcon} />
          <Text style={[text.bodyMed, styles.logoLabel]}>Avail</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={[text.label, styles.stepText]}>STEP 1 OF 5</Text>
          <Text style={[text.label, styles.stepText]}>20%</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill]} />
        </View>

        {/* Question */}
        <Text style={[text.h2, styles.question]}>
          Are you studying full-time or part-time?
        </Text>

        {/* Subtitle */}
        <Text style={[text.bodyReg, styles.subtitle]}>
          Some grants are only available to full-time students. Others top up if you're part-time.
        </Text>

        {/* Options */}
        {['full-time', 'part-time'].map((option) => (
          <RadioButton
            key={option}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            value={option}
            selected={selected === option}
            onPress={() => setSelected(option)}
          />
        ))}

        <View style={{ flex: 1 }} />

        <Button label="Continue" onPress={handleContinue} disabled={!selected} />
        <Button label="‹  Back" onPress={() => navigation.goBack()} variant="back"  style={{ marginTop: 12 }}/>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    flexGrow: 1,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 8,
  },
  logoLabel: {
    color: colors.primary.teal900,
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepText: {
    color: colors.neutral.gray500,
  },
  progressBg: {
    height: 6,
    backgroundColor: colors.neutral.gray300,
    borderRadius: 999,
    marginBottom: 23,
  },
  progressFill: {
    height: 6,
    width: '20%',
    backgroundColor: colors.primary.teal500,
    borderRadius: 999,
  },

  // Question
  question: {
    color: colors.primary.teal900,
    marginBottom: 24,
  },

  // Subtitle
  subtitle: {
    color: colors.neutral.gray500,
    marginBottom: 28,
  },
});