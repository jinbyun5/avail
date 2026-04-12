import React, { useState, useCallback} from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import Button from '../../components/Button';

import { colors, text } from '../../styles/Appstyles';

const QUESTIONS = [
  { key: 'renting',    label: 'Are you currently renting?' },
  { key: 'partTime',   label: 'Do you work part-time while studying?' },
  { key: 'dental',     label: 'Do you have existing dental insurance?' },
  { key: 'firstGen',   label: 'Are you a first-generation post-secondary student?' },
  { key: 'disability', label: 'Do you have a disability or accessibility need?' },
];

export default function Quiz5Screen({ navigation, route }) {
  const previousAnswers = route.params?.answers || {};

  const [answers, setAnswers] = useState({
    renting:    null,
    partTime:   null,
    dental:     null,
    firstGen:   null,
    disability: null,
  });

//   reset answers to null whenever screen is focused (in case user goes back to edit previous questions)
  useFocusEffect(
  useCallback(() => {
    setAnswers({
      renting:    null,
      partTime:   null,
      dental:     null,
      firstGen:   null,
      disability: null,
    });
  }, [])
);

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const allAnswered = Object.values(answers).every(v => v !== null);

  const handleSubmit = async () => {
    const allAnswers = { ...previousAnswers, ...answers };
    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(allAnswers));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }

    navigation.navigate('Loading', { answers: allAnswers });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Logo row */}
        <View style={styles.logoRow}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logoIcon}
          />
          <Text style={[text.bodyMed, styles.logoLabel]}>Avail</Text>
        </View>

        {/* Step + Progress */}
        <View style={styles.progressRow}>
          <Text style={[text.label, styles.stepText]}>STEP 5 OF 5</Text>
          <Text style={[text.label, styles.stepText]}>100%</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={styles.progressFill} />
        </View>

        {/* Title */}
        <Text style={[text.h2, styles.title]}>
          A few more questions.
        </Text>

        {/* Subtitle */}
        <Text style={[text.bodyReg, styles.subtitle]}>
          These help us find more specific{'\n'}programs for your situation.
        </Text>

        {/* Questions */}
        {QUESTIONS.map((q) => (
          <View key={q.key} style={styles.questionBlock}>
            <Text style={[text.bodyReg, styles.questionLabel]}>
              {q.label}
            </Text>
            <View style={styles.optionRow}>

              {/* YES */}
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  answers[q.key] === true && styles.optionSelected,
                ]}
                onPress={() => handleSelect(q.key, true)}
                activeOpacity={0.7}
              >
                <Text style={[
                  text.bodyMed,
                  styles.optionText,
                  answers[q.key] === true && styles.optionTextSelected,
                ]}>
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO */}
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  answers[q.key] === false && styles.optionSelected,
                ]}
                onPress={() => handleSelect(q.key, false)}
                activeOpacity={0.7}
              >
                <Text style={[
                  text.bodyMed,
                  styles.optionText,
                  answers[q.key] === false && styles.optionTextSelected,
                ]}>
                  No
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}

        <Button label="Find my benefits" onPress={handleSubmit} disabled={!allAnswered} />
        <Button label="‹  Back" onPress={() => navigation.goBack()} variant="back" style={{ marginTop: 12 }} />

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
    backgroundColor: colors.primary.teal50,
    borderRadius: 999,
    marginBottom: 24,
  },
  progressFill: {
    height: 6,
    width: '100%',
    backgroundColor: colors.primary.teal500,
    borderRadius: 999,
  },

  // Title
  title: {
    color: colors.primary.teal900,
    marginBottom: 24,
  },

  // Subtitle
  subtitle: {
    width: 257,
    color: colors.neutral.gray500,
    marginBottom: 28,
  },

  // Questions
  questionBlock: {
    marginBottom: 24,
  },
  questionLabel: {
    color: colors.primary.teal900,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  optionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.neutral.gray300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: colors.primary.teal100,
    borderColor: colors.primary.teal900,
  },
  optionText: {
    color: colors.primary.teal900,
  },
  optionTextSelected: {
    color: colors.primary.teal900,
  },
});