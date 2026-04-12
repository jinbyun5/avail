import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioButton from '../../components/RadioButton';
import Button from '../../components/Button';

import { colors, text } from '../../styles/Appstyles';

const OPTIONS = [
  { key: 'under40k',  label: 'Under $40K' },
  { key: '40k-80k',   label: '$40K – $80K' },
  { key: 'over80k',   label: 'Over $80K' },
];

export default function Quiz3Screen({ navigation, route }) {

  const previousAnswers = route.params?.answers || {};
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    navigation.navigate('Quiz4', { answers: { ...previousAnswers, income: selected } });
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
          <Text style={[text.label, styles.stepText]}>STEP 3 OF 5</Text>
          <Text style={[text.label, styles.stepText]}>60%</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={styles.progressFill} />
        </View>

        {/* Question */}
        <Text style={[text.h2, styles.question]}>
          Annual household income?
        </Text>

        {/* Subtitle */}
        <Text style={[text.bodyReg, styles.subtitle]}>
          Most student grants and credits are income-based. We only need a range, never stored.
        </Text>

        {/* Options */}
        {OPTIONS.map((option) => (
          <RadioButton
            key={option.key}
            label={option.label}
            value={option.key}
            selected={selected === option.key}
            onPress={() => setSelected(option.key)}
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
    width: '60%',
    backgroundColor: colors.primary.teal500,
    borderRadius: 999,
  },
  question: {
    color: colors.primary.teal900,
    marginBottom: 24,
  },
  subtitle: {
    color: colors.neutral.gray500,
    marginBottom: 28,
  },
});