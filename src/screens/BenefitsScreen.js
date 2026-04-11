import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, text } from '../styles/Appstyles';
import BenefitCard from '../components/BenefitCard';

// ─── Mock data ────────────────────────────────────────────────────────────────
// Replace with API response shape when wiring up the backend.

const ALL_BENEFITS = [
  {
    id:          'bc-access-grant',
    category:    'Student Aid',
    title:       'BC Access Grant',
    amount:      'Up to $4,000/yr',
    eligibility: 'Likely eligible',
    saved:       false,
  },
  {
    id:          'canada-student-grant',
    category:    'Student Aid',
    title:       'Canada Student Grant',
    amount:      'Up to $3,000/yr',
    eligibility: 'Likely eligible',
    saved:       false,
  },
  {
    id:          'gst-hst-credit',
    category:    'Tax Credit',
    title:       'GST/HST Credit',
    amount:      'Up to $519/yr',
    eligibility: 'Likely eligible',
    saved:       true,
  },
  {
    id:          'canada-dental-care',
    category:    'Health',
    title:       'Canada Dental Care Plan',
    amount:      'Coverage varies',
    eligibility: 'Check eligibility',
    saved:       false,
  },
];

// Filter categories surfaced from the user's profile.
// Replace with API-provided filter list when wiring up the backend.
const FILTER_CATEGORIES = ['All', 'Student Aid', 'Tax Credit', 'Housing'];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function BenefitsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredBenefits =
    activeFilter === 'All'
      ? ALL_BENEFITS
      : ALL_BENEFITS.filter(b => b.category === activeFilter);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={[text.label, styles.matchesLabel]}>YOUR MATCHES</Text>
        <Text style={[text.h1, styles.countTitle]}>
          {ALL_BENEFITS.length} benefits found.
        </Text>
      </View>

      {/* ── Filter chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_CATEGORIES.map(cat => {
          const active = activeFilter === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setActiveFilter(cat)}
            >
              <Text style={[text.smallMed, active ? styles.filterLabelActive : styles.filterLabel]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ── Benefits list ── */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBenefits.map(benefit => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            // onSaveToggle   — wire to save API later
            // onViewDetails  — wire to BenefitDetailScreen navigation later
          />
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.appBg,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  matchesLabel: {
    color: colors.neutral.secondaryText,
    marginBottom: 4,
  },
  countTitle: {
    color: colors.neutral.primaryText,
  },

  // Filter chips
  filterScroll: {
    flexGrow: 0,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.neutral.divider,
  },
  filterChipActive: {
    borderColor: colors.brand.accent,
  },
  filterLabel: {
    color: colors.neutral.secondaryText,
  },
  filterLabelActive: {
    color: colors.brand.accent,
  },

  // Benefits list
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
