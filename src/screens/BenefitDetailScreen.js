import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, text } from '../styles/Appstyles';

// ─── Mock detail data ─────────────────────────────────────────────────────────
// Replace with API response when wiring up backend.

const BENEFIT_DETAILS = {
  'bc-access-grant': {
    category:        'Student Aid',
    title:           'BC Access Grant',
    amount:          'Up to $4,000/yr',
    eligibility:     'Likely eligible',
    description:     'The BC Access Grant provides upfront, non-repayable funding to help reduce financial barriers for BC students from low- and middle-income families. This grant is automatically assessed when you apply for student financial assistance.',
    requirements:    [
      'BC resident or Canadian citizen',
      'Enrolled full-time in eligible program',
      'Family income under $100,000/year',
      'Applied for student financial aid',
    ],
    howToApply:      'Apply through StudentAid BC when you submit your application for student financial assistance. You\'ll be automatically assessed for this grant based on your eligibility.',
    applyUrl:        'https://studentaidbc.ca',
    applyLabel:      'Apply on studentaidbc.ca',
  },
  'canada-student-grant': {
    category:        'Student Aid',
    title:           'Canada Student Grant',
    amount:          'Up to $3,000/yr',
    eligibility:     'Likely eligible',
    description:     'The Canada Student Grant provides non-repayable funding to help students from low- and middle-income families pay for post-secondary education.',
    requirements:    [
      'Canadian citizen, permanent resident, or protected person',
      'Enrolled in eligible post-secondary program',
      'Demonstrated financial need',
      'Applied for federal student aid',
    ],
    howToApply:      'Apply through your provincial or territorial student aid office. The grant is assessed automatically when you apply for student loans.',
    applyUrl:        'https://canada.ca/student-aid',
    applyLabel:      'Apply on canada.ca',
  },
  'gst-hst-credit': {
    category:        'Tax Credit',
    title:           'GST/HST Credit',
    amount:          'Up to $519/yr',
    eligibility:     'Likely eligible',
    description:     'The GST/HST credit is a tax-free quarterly payment that helps individuals and families with low and modest incomes offset the GST or HST that they pay.',
    requirements:    [
      'Canadian resident for income tax purposes',
      '19 years of age or older',
      'Have filed a tax return',
      'Meet income threshold requirements',
    ],
    howToApply:      'File your income tax return each year. The CRA will automatically determine your eligibility and send payments quarterly.',
    applyUrl:        'https://canada.ca/gst-hst-credit',
    applyLabel:      'Apply on canada.ca',
  },
  'canada-dental-care': {
    category:        'Health',
    title:           'Canada Dental Care Plan',
    amount:          'Coverage varies',
    eligibility:     'Check eligibility',
    description:     'The Canada Dental Care Plan provides dental coverage for Canadians who do not have access to dental insurance and have a family income under $90,000.',
    requirements:    [
      'No access to dental insurance through employer or government',
      'Family adjusted net income under $90,000',
      'Filed a tax return for the previous year',
      'Canadian resident',
    ],
    howToApply:      'Apply through the Government of Canada website or by calling Service Canada. You will need your tax information and proof of residency.',
    applyUrl:        'https://canada.ca/dental-care',
    applyLabel:      'Apply on canada.ca',
  },
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function BenefitDetailScreen({ navigation, route }) {
  const benefitId = route.params?.id ?? 'bc-access-grant';
  const benefit   = BENEFIT_DETAILS[benefitId] ?? BENEFIT_DETAILS['bc-access-grant'];

  const handleApply = () => {
    Linking.openURL(benefit.applyUrl);
  };

  const handleAskAvail = () => {
    navigation.navigate('Ask', { benefitTitle: benefit.title });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={16} color={colors.neutral.secondaryText} />
          <Text style={[text.bodyMed, styles.backText]}>Back</Text>
        </TouchableOpacity>

        {/* Category tag */}
        <View style={styles.categoryTag}>
          <Text style={[text.smallMed, styles.categoryText]}>
            {benefit.category}
          </Text>
        </View>

        {/* Title + Amount */}
        <Text style={[text.h1, styles.title]}>{benefit.title}</Text>
        <Text style={[text.h1, styles.amount]}>{benefit.amount}</Text>

        {/* White card wrapping title and below */}
        <View style={styles.card}>

        {/* Likely eligible badge */}
        <View style={styles.eligibilityBadge}>
          <View style={styles.eligibilityIcon}>
            <Ionicons name="checkmark" size={14} color={colors.neutral.cardInputNav} />
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
            <Ionicons name="checkmark" size={12} color={colors.brand.primary} />
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
          <Ionicons name="open-outline" size={16} color={colors.neutral.cardInputNav} />
        </TouchableOpacity>

        {/* Ask avail button */}
        <TouchableOpacity style={styles.askBtn} onPress={handleAskAvail} activeOpacity={0.8}>
          <Text style={[text.bodyMed, styles.askBtnText]}>Ask avail about this benefit</Text>
        </TouchableOpacity>

        {/* Save for later */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7}>
          <Ionicons name="star-outline" size={16} color={colors.neutral.secondaryText} />
          <Text style={[text.smallReg, styles.saveText]}>Save for later</Text>
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
    backgroundColor: colors.benefitCards.studentAidCard,
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
    color: colors.neutral.secondaryText,
  },

  // Category tag
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.label.studentAid,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  categoryText: {
    color: colors.label.studentAidText,
  },

  // Title + Amount
  title: {
    color: colors.neutral.primaryText,
    marginBottom: 4,
    paddingHorizontal: 20,
  },

  amount: {
    color: colors.label.studentAidText,
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
    color: colors.neutral.primary,
    marginBottom: 2,
  },
  eligibilitySubtitle: {
    color: colors.neutral.secondaryText,
  },

  // Description
  description: {
    color: colors.neutral.primaryText,
    marginBottom: 24,
  },

  // Section label
  sectionLabel: {
    color: colors.neutral.secondaryText,
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
    color: colors.neutral.primaryText,
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
    color: colors.neutral.primaryText,
  },

  // Apply button
  applyBtn: {
    height: 52,
    backgroundColor: colors.brand.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  applyBtnText: {
    color: colors.neutral.cardInputNav,
  },

  // Ask avail button
  askBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.brand.hoverLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  askBtnText: {
    color: colors.brand.primary,
  },

  // Save for later
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  saveText: {
    color: colors.neutral.secondaryText,
  },

  // White Card
  card: {
    backgroundColor: colors.neutral.cardInputNav,
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
  backgroundColor: colors.brand.hoverLight,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 2,
},
});