import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, text } from '../styles/Appstyles';

// ─── Design token mappings ────────────────────────────────────────────────────
// Add new categories here as the backend introduces them.

export const CARD_BG = {
  'Student Aid': colors.cards.studentAid,
  'Tax Credit':  colors.cards.tax,
  'Health':      colors.cards.health,
  'Housing':     colors.neutral.gray300,   // token TBD
};

export const CATEGORY_LABEL = {
  'Student Aid': { bg: colors.label.studentAid, fg: colors.label.studentAidText },
  'Tax Credit':  { bg: colors.label.tax,        fg: colors.label.taxText },
  'Housing':     { bg: colors.label.housing,    fg: colors.label.housingText },
  'Health':      { bg: colors.label.health,     fg: colors.label.healthText },
};

// Maps an eligibility string from the API to its badge style.
// Add new states here as the API introduces them.
const ELIGIBILITY_BADGE = {
  'Likely eligible':  { icon: 'checkmark-circle', bg: colors.status.success, fg: colors.status.successText },
  'Check eligibility':{ icon: 'warning',           bg: colors.status.warning, fg: colors.status.warningText },
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * BenefitCard
 *
 * Props:
 *   benefit        — benefit object (id, category, title, amount, eligibility, saved)
 *   onSaveToggle   — callback(id) — wire to save/unsave API endpoint
 *   onViewDetails  — callback(id) — wire to BenefitDetailScreen navigation
 */
export default function BenefitCard({ benefit, onSaveToggle, onViewDetails }) {
  // const [saved, setSaved] = useState(benefit.saved);
  const saved = benefit.saved;
  const setSaved = () => {};

  const cardBg      = CARD_BG[benefit.category] ?? colors.neutral.gray300;
  const labelPalette = CATEGORY_LABEL[benefit.category];
  const badge       = ELIGIBILITY_BADGE[benefit.eligibility] ?? ELIGIBILITY_BADGE['Likely eligible'];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { backgroundColor: cardBg }, pressed && styles.pressed]}
      onPress={() => onViewDetails?.(benefit.id)}
    >

      {/* Category chip + eligibility badge */}
      <View style={styles.cardTop}>
        <View style={[styles.categoryChip, { backgroundColor: labelPalette?.bg ?? colors.neutral.gray300 }]}>
          <Text style={[text.smallMed, { color: labelPalette?.fg ?? colors.primary.teal900 }]}>
            {benefit.category}
          </Text>
        </View>

        <View style={[styles.eligibilityBadge, { backgroundColor: badge.bg }]}>
          <Ionicons name={badge.icon} size={12} color={badge.fg} />
          <Text style={[text.smallMed, { color: badge.fg }]}>
            {benefit.eligibility}
          </Text>
        </View>
      </View>

      {/* Title + amount */}
      <Text style={[text.h2, styles.title]}>{benefit.title}</Text>
      <Text style={[text.smallReg, { color: colors.neutral.gray500 }]}>
        {benefit.amount}
      </Text>

      {/* Save toggle + View details */}
      <View style={styles.cardFooter}>
        {/* Wire onSaveToggle to API later */}
        <Pressable onPress={() => { setSaved(s => !s); onSaveToggle?.(benefit.id); }} hitSlop={12}>
          <Ionicons
            name={saved ? 'star' : 'star-outline'}
            size={20}
            color={saved ? colors.primary.teal500 : colors.neutral.gray400}
          />
        </Pressable>

        {/* Wire onViewDetails to BenefitDetailScreen navigation later */}
        <Pressable
          style={({ pressed }) => [styles.viewDetails, pressed && styles.pressed]}
          onPress={() => onViewDetails?.(benefit.id)}
          hitSlop={12}
        >
          <Text style={[text.smallMed, { color: colors.primary.teal900 }]}>
            View details
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary.teal900} />
        </Pressable>
      </View>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  eligibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  title: {
    color: colors.primary.teal900,
    marginBottom: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
