import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, text } from '../styles/Appstyles';
import BenefitCard from '../components/BenefitCard';

// ─── Mock data ────────────────────────────────────────────────────────────────
// Replace with API response shape when wiring up the backend.

const SUMMARY = {
  greeting:     'GOOD MORNING',
  annualValue:  '$7,919',
  matchedCount: 5,
  categories:   ['Student Aid', 'Tax Credit', 'Housing', 'Health'],
};

const TOP_MATCHES = [
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
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Semi-transparent pill chip used on the dark summary card. */
function SummaryChip({ label }) {
  return (
    <View style={styles.summaryChip}>
      <Text style={[text.smallMed, styles.summaryChipText]}>{label}</Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Text style={[text.label, styles.greeting]}>{SUMMARY.greeting}</Text>
        <Text style={[text.h1, styles.pageTitle]}>Here's your summary.</Text>

        {/* ── Summary card ── */}
        <View style={styles.summaryCard}>
          <Text style={[text.label, styles.summaryLabel]}>EST. ANNUAL VALUE</Text>
          <Text style={[text.hero, styles.summaryValue]}>{SUMMARY.annualValue}</Text>
          <Text style={[text.smallReg, styles.summarySubtext]}>
            across {SUMMARY.matchedCount} matched benefits
          </Text>
          <View style={styles.chipRow}>
            {SUMMARY.categories.map(cat => (
              <SummaryChip key={cat} label={cat} />
            ))}
          </View>
        </View>

        {/* ── Quick actions ── */}
        <View style={styles.quickActions}>
          {/* Wire onPress to AskScreen navigation later */}
          <Pressable style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
            <Ionicons name="sparkles" size={20} color={colors.brand.primary} />
            <Text style={[text.h2, styles.actionTitle]}>Ask avail</Text>
            <Text style={[text.smallReg, { color: colors.neutral.secondaryText }]}>
              AI-powered Q&A
            </Text>
          </Pressable>

          {/* Wire onPress to BenefitsScreen navigation later */}
          <Pressable style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
            <Ionicons name="apps-outline" size={20} color={colors.brand.primary} />
            <Text style={[text.h2, styles.actionTitle]}>All benefits</Text>
            <Text style={[text.smallReg, { color: colors.neutral.secondaryText }]}>
              View & filter
            </Text>
          </Pressable>
        </View>

        {/* ── Top matches ── */}
        <Text style={[text.label, styles.sectionLabel]}>TOP MATCHES</Text>
        {TOP_MATCHES.map(benefit => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            // onSaveToggle — wire to save API later
            // onViewDetails — wire to BenefitDetailScreen navigation later
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },

  // Header
  greeting: {
    color: colors.brand.accent,
    marginBottom: 4,
  },
  pageTitle: {
    color: colors.neutral.primaryText,
    marginBottom: 20,
  },

  // Summary card
  summaryCard: {
    backgroundColor: colors.brand.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  summaryLabel: {
    color: colors.brand.mutedOnDark,
    marginBottom: 8,
  },
  summaryValue: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  summarySubtext: {
    color: 'rgba(255, 255, 255, 0.65)',
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  summaryChipText: {
    color: 'rgba(255, 255, 255, 0.85)',
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.neutral.cardInputNav,
    borderRadius: 12,
    padding: 16,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionTitle: {
    color: colors.neutral.primaryText,
    marginTop: 8,
  },
  pressed: {
    opacity: 0.7,
  },

  // Section label
  sectionLabel: {
    color: colors.neutral.secondaryText,
    marginBottom: 12,
  },
});
