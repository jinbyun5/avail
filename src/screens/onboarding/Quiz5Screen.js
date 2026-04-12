import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, text } from '../../styles/Appstyles';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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

  const handleSubmit = () => {
    const allAnswers = { ...previousAnswers, ...answers };
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

        {/* Find my benefits */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            !allAnswered && styles.submitBtnDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!allAnswered}
          activeOpacity={0.8}
        >
          <Text style={[text.bodyMed, styles.submitText]}>
            Find my benefits
          </Text>
        </TouchableOpacity>

        {/* Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={[text.smallReg, styles.backText]}>
            ‹  Back
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.cardInputNav,
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
    color: colors.neutral.primaryText,
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepText: {
    color: colors.neutral.secondaryText,
  },
  progressBg: {
    height: 6,
    backgroundColor: colors.neutral.appBg,
    borderRadius: 999,
    marginBottom: 24,
  },
  progressFill: {
    height: 6,
    width: '100%',
    backgroundColor: colors.brand.accent,
    borderRadius: 999,
  },

  // Title
  title: {
    color: colors.brand.primary,
    marginBottom: 24,
  },

  // Subtitle
  subtitle: {
    width: 257,
    color: colors.neutral.secondaryText,
    marginBottom: 28,
  },

  // Questions
  questionBlock: {
    marginBottom: 24,
  },
  questionLabel: {
    color: colors.neutral.primaryText,
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
    borderColor: colors.neutral.divider,
    backgroundColor: colors.neutral.cardInputNav,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: colors.brand.hoverLight,
    borderColor: colors.brand.primary,
  },
  optionText: {
    color: colors.neutral.primaryText,
  },
  optionTextSelected: {
    color: colors.neutral.primaryText,
  },

  // Submit
  submitBtn: {
    height: 52,
    backgroundColor: colors.brand.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitBtnDisabled: {
    backgroundColor: colors.neutral.placeholder,
  },
  submitText: {
    color: colors.neutral.cardInputNav,
  },

  // Back
  backBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backText: {
    color: colors.neutral.secondaryText,
  },
});