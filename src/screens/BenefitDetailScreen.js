import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, text } from '../styles/Appstyles';
import { CARD_BG, CATEGORY_LABEL } from '../components/BenefitCard';

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function BenefitDetailScreen({ navigation, route }) {

  const benefit = route.params?.benefit;
  const labelPalette = CATEGORY_LABEL[benefit.category];

  const handleApply = () => {
    Linking.openURL(benefit.applyUrl);
  };

  const handleAskAvail = () => {
    navigation.navigate('Ask', { benefitTitle: benefit.title });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: CARD_BG[benefit.category] }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={16} color={colors.neutral.gray500} />
          <Text style={[text.bodyMed, styles.backText]}>Back</Text>
        </TouchableOpacity>

        {/* Category tag */}
        <View style={[styles.categoryTag, { backgroundColor: labelPalette?.bg }]}>
          <Text style={[text.smallMed, { color: labelPalette?.fg }]}>
            {benefit.category}
          </Text>
        </View>

        {/* Title + Amount */}
        <Text style={[text.h1, styles.title]}>{benefit.title}</Text>
        <Text style={[text.h1, styles.amount, { color: labelPalette?.fg }]}>{benefit.amount}</Text>

        {/* White card wrapping title and below */}
        <View style={styles.card}>

        {/* Likely eligible badge */}
        <View style={styles.eligibilityBadge}>
          <View style={styles.eligibilityIcon}>
            <Ionicons name="checkmark" size={14} color={colors.neutral.gray300} />
          </View>
          <View>
            <Text style={[text.bodyMed,styles.eligibilityTitle]}>
              {benefit.eligibility}
            </Text>
            <Text style={[text.bodyReg, styles.eligibilitySubtitle]}>
              Based on your profile — verify before applying
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={[text.bodyReg, styles.description]}>
          {benefit.description}
        </Text>

        {/* Eligibility Requirements */}
        <Text style={[text.label, styles.sectionLabel]}>
          ELIGIBILITY REQUIREMENTS
        </Text>
        {benefit.requirements.map((req, i) => (
          <View key={i} style={styles.requirementRow}>
        {/* Checkmark with circle background */}
        <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={12} color={colors.primary.teal900} />
        </View>
            <Text style={[text.bodyReg, styles.requirementText]}>{req}</Text>
          </View>
        ))}

        {/* How to Apply */}
        <View style={styles.howToApplyBox}>
          <Text style={[text.label, styles.sectionLabel]}>HOW TO APPLY</Text>
          <Text style={[text.bodyReg, styles.howToApplyText]}>
            {benefit.howToApply}
          </Text>
        </View>

        {/* Apply button */}
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.8}>
          <Text style={[text.bodyMed, styles.applyBtnText]}>{benefit.applyLabel}</Text>
          <Ionicons name="open-outline" size={16} color={colors.neutral.gray300} />
        </TouchableOpacity>

        {/* Ask avail button */}
        <TouchableOpacity style={styles.askBtn} onPress={handleAskAvail} activeOpacity={0.8}>
          <Text style={[text.bodyMed, styles.askBtnText]}>Ask avail about this benefit</Text>
        </TouchableOpacity>
        
        </View>
      </ScrollView>
    </SafeAreaView>
   
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingBottom: 0,
  },

  // Back
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 4,
    paddingHorizontal: 20,
  },
  backText: {
    color: colors.neutral.gray500,
  },

  // Category tag
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
    marginHorizontal: 20,
  },

  // Title + Amount
  title: {
    color: colors.primary.teal900,
    marginBottom: 4,
    paddingHorizontal: 20,
  },

  amount: {
    marginBottom: 16,
    paddingHorizontal: 20,

  },

  // Eligibility badge
  eligibilityBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.status.success,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  eligibilityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.status.successText,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  eligibilityTitle: {
    color: colors.primary.teal900,
    marginBottom: 2,
  },
  eligibilitySubtitle: {
    color: colors.neutral.gray500,
  },

  // Description
  description: {
    color: colors.primary.teal900,
    marginBottom: 24,
  },

  // Section label
  sectionLabel: {
    color: colors.neutral.gray500,
    marginBottom: 12,
  },

  // Requirements
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  checkIcon: {
    marginTop: 4,
  },
  requirementText: {
    flex: 1,
    color: colors.primary.teal900,
  },

  // How to Apply
  howToApplyBox: {
    backgroundColor: 'rgba(224, 240, 249, 0.25)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  howToApplyText: {
    color: colors.primary.teal900,
  },

  // Apply button
  applyBtn: {
    height: 52,
    backgroundColor: colors.primary.teal900,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  applyBtnText: {
    color: colors.neutral.gray300,
  },

  // Ask avail button
  askBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary.teal100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  askBtnText: {
    color: colors.primary.teal900,
  },

  // Save for later
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  saveText: {
    color: colors.neutral.gray500,
  },

  // White Card
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 8,
    paddingBottom: 48,
  },

  checkCircle: {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.primary.teal100,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 2,
},
});