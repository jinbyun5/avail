import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors, text } from '../styles/Appstyles';
import BenefitCard from '../components/BenefitCard';

// ─── Mock data ────────────────────────────────────────────────────────────────
// Replace with API response shape when wiring up the backend.

const SUMMARY = {
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

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
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Text style={[text.h1, styles.pageTitle]}>{getGreeting()}, here's what you qualify for.</Text>

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
          {/* Primary tile — wire onPress to AskScreen navigation later */}
          <Pressable style={({ pressed }) => [styles.actionCardPrimary, pressed && styles.pressed]}>
            <Ionicons name="sparkles" size={20} color={colors.brand.mutedOnDark} />
            <Text style={[text.h2, styles.actionTitlePrimary]}>Ask avail</Text>
            <Text style={[text.smallReg, { color: colors.brand.mutedOnDark }]}>
              AI-powered Q&A
            </Text>
          </Pressable>

          {/* Secondary tile */}
          <Pressable
            style={({ pressed }) => [styles.actionCardSecondary, pressed && styles.pressed]}
            onPress={() => navigation.navigate('Benefits')}
          >
            <Ionicons name="search-outline" size={20} color={colors.brand.primary} />
            <Text style={[text.h2, styles.actionTitleSecondary]}>All benefits</Text>
            <Text style={[text.smallReg, { color: colors.neutral.secondaryText }]}>
              View & filter
            </Text>
          </Pressable>
        </View>

        {/* ── Top matches ── */}
        <Text style={[text.smallMed, styles.sectionLabel]}>Your top matches</Text>
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
  actionCardPrimary: {
    flex: 6,
    backgroundColor: colors.brand.accent,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  actionCardSecondary: {
    flex: 4,
    borderRadius: 12,
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.neutral.divider,
  },
  actionTitlePrimary: {
    color: '#FFFFFF',
    marginTop: 8,
  },
  actionTitleSecondary: {
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
