import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { colors, text } from '../styles/Appstyles';
import BenefitCard from '../components/BenefitCard';
import { toggleSavedBenefit } from '../data/storage';

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function BenefitsScreen() {

  const navigation = useNavigation();
  const [benefits, setBenefits] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter categories surfaced from the user's profile.
  const categories = ['All', ...new Set(benefits.map(b => b.category))];

  const filteredBenefits =
    activeFilter === 'All'
      ? benefits
      : benefits.filter(b => b.category === activeFilter);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const raw = await AsyncStorage.getItem('benefits');
        if (raw) setBenefits(JSON.parse(raw).benefits);
      };
      load();
    }, [])
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')} hitSlop={12}>
          <Ionicons name="chevron-back" size={18} color={colors.neutral.secondaryText} />
          <Text style={[text.bodyReg, styles.backLabel]}>Back</Text>
        </Pressable>
        <Text style={[text.label, styles.matchesLabel]}>Your matches</Text>
        <Text style={[text.h1, styles.countTitle]}>
          {benefits.length} benefits found.
        </Text>
      </View>

      {/* ── Filter chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map(cat => {
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
            onSaveToggle={async (id) => {
              const updated = await toggleSavedBenefit(id);
              setBenefits(updated.benefits);
              console.log('saved benefits:', updated.benefits.filter(b => b.saved));
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

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  backLabel: {
    color: colors.neutral.secondaryText,
  },
  matchesLabel: {
    color: colors.neutral.gray500,
    marginBottom: 4,
  },
  countTitle: {
    color: colors.primary.teal900,
  },

  // Filter chips
  filterScroll: {
    flexGrow: 0,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    backgroundColor: '#fff',
  },
  filterChipActive: {
    borderColor: colors.primary.teal900,
    backgroundColor: colors.primary.teal100,
  },
  filterLabel: {
    color: colors.neutral.gray500,
  },
  filterLabelActive: {
    color: colors.primary.teal900,
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
