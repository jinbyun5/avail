import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, text } from '../styles/Appstyles';

export default function Button({ label, onPress, variant = 'primary', disabled = false, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[text.bodyMed, styles[`${variant}Text`]]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Primary
  primary: {
    height: 52,
    backgroundColor: colors.primary.teal900,
  },
  primaryText: {
    color: '#fff',
  },

  // Secondary
  secondary: {
    backgroundColor: colors.primary.teal100,
  },
  secondaryText: {
    color: colors.neutral.gray500,
  },

  // Back
  back: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backText: {
    color: colors.neutral.gray500,
    ...text.smallReg,
  },

  // Disabled
  disabled: {
    backgroundColor: colors.neutral.gray400,
  },
});