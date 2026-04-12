import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, text } from '../styles/Appstyles';

// Profile Rows
const PROFILE_ROWS = [
    { key: 'studyLoad',     label: 'Study load' },
    { key: 'schoolType',    label: 'School type' },
    { key: 'income',        label: 'Income' },
    { key: 'studentStatus', label: 'Student status' },
    { key: 'renting',       label: 'Renting',           boolean: true },
    { key: 'partTime',      label: 'Working part-time', boolean: true },
    { key: 'dental',        label: 'Dental insurance',  boolean: true },
    { key: 'firstGen',      label: 'First generation',  boolean: true },
];

// Screen
export default function ProfileScreen({ navigation }) {
    const [profile, setProfile] = useState(null);

    // Load profile from AsyncStorage
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const stored = await AsyncStorage.getItem('userProfile');
                if (stored) setProfile(JSON.parse(stored));
            } catch (error) {
                console.error('Failed to load profile:', error);
            }
        };
        loadProfile();
    }, []);

    const formatValue = (key, value, boolean) => {
        if (value === null || value === undefined) return '-';
        if (boolean) return value ? 'Yes' : 'No';
        return String(value);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Back */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={20} color={colors.neutral.gray500} />
                    <Text style={[text.bodyReg, styles.backBtnText]}>Back</Text>
                </TouchableOpacity>

                {/* Title */}
                <Text style={[text.h1, styles.title]}>Your profile</Text>
                <Text style={[text.bodyReg, styles.subtitle]}>Used to match your benefits</Text>

                {/* Stat cards */}
                <View style={styles.statRow}>
                    <View style={styles.statCard}>
                        <Text style={[text.h1, styles.statNumber]}>5</Text>
                        <Text style={[text.smallReg, styles.statLabel]}>Benefits matched</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[text.h1, styles.statNumber]}>$7,919</Text>
                        <Text style={[text.smallReg, styles.statLabel]}>Est. annual value</Text>
                    </View>
                </View>

                {/* Profile rows card */}
                <View style={styles.card}>
                    {PROFILE_ROWS.map((row, index) => (
                        <View key={row.key}>
                            <View style={styles.row}>
                                <Text style={[text.bodyReg, styles.rowLabel]}>{row.label}</Text>
                                <Text style={[text.bodyMed, styles.rowValue]}>
                                    {profile
                                        ? formatValue(row.key, profile[row.key], row.boolean)
                                        : '-'}
                                </Text>
                            </View>
                            {index < PROFILE_ROWS.length - 1 && (<View style={styles.divider} />
    )}
                            </View>
                    ))}
                </View>

{/* Update my answers */}
<TouchableOpacity
  style={styles.updateBtn}
  onPress={() => navigation.navigate('Quiz1')}
  activeOpacity={0.8}
>
  <Text style={[text.bodyMed, styles.updateBtnText]}>
    Update my answers
  </Text>
</TouchableOpacity>

{/* View all my benefits */}
<TouchableOpacity
  style={styles.footerBtn}
  onPress={() => navigation.navigate('Benefits')}
  activeOpacity={0.8}
>
  <Text style={[text.bodyMed, styles.footerBtnText]}>
    View all my benefits
  </Text>
</TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.primary.teal50,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 32,
        flexGrow: 1,
    },

    // Back
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 20,
        gap: 4,
    },
    backBtnText: {
        color: colors.neutral.gray500,
    },

    // Title
    title: {
        color: '#1E293B',
        marginBottom: 24,
    },
    subtitle: {
        color: colors.neutral.gray500,
        marginBottom: 24,
    },

    // Stat cards
    statRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.primary.teal100,
        borderRadius: 12,
        padding: 20,
        minHeight: 84,
    },
    statNumber: {
        color: '#1E293B',
        marginBottom: 8,
    },
    statLabel: {
        color: colors.neutral.gray500,
    },

    // Profile rows card
    card: {
        backgroundColor: '#FEFDFD',
        borderRadius: 12,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: colors.neutral.gray300,
        marginBottom: 24,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        minHeight: 57,
        paddingHorizontal: 20,
    },

    rowLabel: {
        color: colors.neutral.gray500,
    },

    rowValue: {
        color: '#1E293B',
        lineHeight: 24,
    },

    divider: {
        height: 1,
        backgroundColor: colors.neutral.gray300,
    },

    updateBtn: {
        height: 52,
        backgroundColor: colors.primary.teal900,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 12,
    },

    updateBtnText: {
        color: '#FEFDFD',
    },

    footerBtn: {
        height: 52,
        backgroundColor: colors.primary.teal100,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footerBtnText: {
        color: colors.primary.teal500,
    },

});