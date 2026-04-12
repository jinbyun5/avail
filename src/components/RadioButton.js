import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RadioButton as PaperRadio } from 'react-native-paper';

import { colors, text } from '../styles/Appstyles';

export default function RadioButton({ label, value, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.optionBtn, selected && styles.optionSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <PaperRadio
        value={value}
        status={selected ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={colors.primary.teal900}
        uncheckedColor={colors.neutral.gray300}
      />
      <Text style={[text.bodyReg, styles.optionText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutral.gray300,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    height: 60,
  },
  optionSelected: {
    borderColor: colors.primary.teal900,
    backgroundColor: colors.primary.teal50,
  },
  optionText: {
    color: colors.primary.teal900,
  },
});