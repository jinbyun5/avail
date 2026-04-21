import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { colors, text } from '../styles/Appstyles';
import BenefitCard from '../components/BenefitCard';
import { toggleSavedBenefit } from '../data/storage';

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
  const [benefits, setBenefits] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const raw = await AsyncStorage.getItem('benefits');
        if (raw) setBenefits(JSON.parse(raw));
      };
      load();
    }, [])
  );

  if (!benefits) return null;

  const annualValue = `$${benefits.totalAnnualValue.toLocaleString()}`;
  const matchedCount = benefits.benefits.length;
  const categories = [...new Set(benefits.benefits.map(b => b.category))];
  const topMatches = benefits.benefits.slice(0, 3);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Brand header ── */}
        <View style={styles.brandHeader}>
          <View style={styles.brandIconWrapper}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.brandIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>Avail</Text>
        </View>

        {/* ── Header ── */}
        <Text style={[text.h1, styles.pageTitle]}>{getGreeting()}, here's what you qualify for.</Text>

        {/* ── Summary card ── */}
        <View style={styles.summaryCard}>
          <Text style={[text.label, styles.summaryLabel]}>EST. ANNUAL VALUE</Text>
          <Text style={[text.hero, styles.summaryValue]}>{annualValue}</Text>
          <Text style={[text.smallReg, styles.summarySubtext]}>
            across {matchedCount} matched benefits
          </Text>
          <View style={styles.chipRow}>
            {categories.map(cat => (
              <SummaryChip key={cat} label={cat} />
            ))}
          </View>
        </View>

        {/* ── Quick actions ── */}
        <View style={styles.quickActions}>
          {/* Primary tile */}
          <Pressable style={({ pressed }) => [styles.actionCardPrimary, pressed && styles.pressed]}
            
            onPress={() => navigation.navigate('Ask')}
          >
            <Ionicons name="sparkles" size={20} color={colors.primary.teal300} />
            <Text style={[text.h2, styles.actionTitlePrimary]}>Ask avail</Text>
            <Text style={[text.smallReg, { color: colors.primary.teal300 }]}>
              AI-powered Q&A
            </Text>
          </Pressable>

          {/* Secondary tile */}
          <Pressable
            style={({ pressed }) => [styles.actionCardSecondary, pressed && styles.pressed]}
            onPress={() => navigation.navigate('Benefits')}
          >
            <Ionicons name="search-outline" size={20} color={colors.primary.teal900} />
            <Text style={[text.h2, styles.actionTitleSecondary]}>All benefits</Text>
            <Text style={[text.smallReg, { color: colors.neutral.gray500 }]}>
              View & filter
            </Text>
          </Pressable>
        </View>

        {/* ── Top matches ── */}
        <Text style={[text.smallMed, styles.sectionLabel]}>Your top matches</Text>
        {topMatches.map(benefit => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            onSaveToggle={async (id) => {
              const updated = await toggleSavedBenefit(id);
              setBenefits(updated);
            }}
            onViewDetails={() => navigation.navigate('BenefitDetail', { benefit })}
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
    backgroundColor: colors.primary.teal50,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },

  // Brand header
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  brandIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary.teal500,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  brandIcon: {
    width: 28,
    height: 28,
  },
  brandName: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    color: colors.primary.teal900,
  },

  // Header
  pageTitle: {
    color: colors.primary.teal900,
    marginBottom: 20,
  },

  // Summary card
  summaryCard: {
    backgroundColor: colors.primary.teal900,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  summaryLabel: {
    color: colors.primary.teal100,
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
    backgroundColor: colors.primary.teal500,
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
    borderColor: colors.neutral.gray300,
  },
  actionTitlePrimary: {
    color: '#FFFFFF',
    marginTop: 8,
  },
  actionTitleSecondary: {
    color: colors.primary.teal900,
    marginTop: 8,
  },
  pressed: {
    opacity: 0.7,
  },

  // Section label
  sectionLabel: {
    color: colors.neutral.gray500,
    marginBottom: 12,
  },
});
