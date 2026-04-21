import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, text } from '../styles/Appstyles';

// Preloaded prompt suggestions
const QUICK_PROMPTS = [
  "Which benefit gives me the most money?",
  "How do I apply for my matched benefits?",
  "What documents do I need to apply?",
];

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

export default function AskScreen() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [benefits, setBenefits] = useState(null);

  // Send message to Claude API
  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || loading) return;

    const userMsg = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: `
                    You are avail, a helpful AI assistant for BC students.
                    The user's profile: ${JSON.stringify(profile)}
                    Their matched benefits: ${JSON.stringify(benefits)}
                    Answer questions about their specific situation only.
                    Keep answers concise and friendly.
                    Always remind users to verify eligibility directly.
                    Do not use markdown formatting like ** or ##. Plain text only.
                    Do not start responses with "That's a great question" or "I don't have specific information". Just answer directly.
                    `,
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const assistantMsg = {
        role: 'assistant',
        content: data.content[0].text,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('API error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      }]);
    } finally {
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const load = async () => {
      const p = await AsyncStorage.getItem('profile');
      const b = await AsyncStorage.getItem('benefits');
      if (p) setProfile(JSON.parse(p));
      if (b) {
        const parsed = JSON.parse(b);
        setBenefits(parsed);
        setMessages([{
          role: 'assistant',
          content: `Hi! I've reviewed your profile and found ${parsed.benefits.length} BC student benefits you may qualify for. What would you like to know more about?`,
        }]);
      }
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={[text.label, styles.headerLabel]}>AI assistant</Text>
          <Text style={[text.h2, styles.headerTitle]}>Ask avail ✦</Text>
        </View>

        <View style={styles.divider} />

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.bubble,
                msg.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={[
                text.bodyReg,
                msg.role === 'user' ? styles.userText : styles.aiText,
              ]}>
                {msg.content}
              </Text>
            </View>
          ))}

          {/* Loading indicator */}
          {loading && (
            <View style={styles.aiBubble}>
              <ActivityIndicator size="small" color={colors.primary.teal500} />
            </View>
          )}
        </ScrollView>

        {/* Quick prompts — show only if no user messages yet */}
          {messages.length === 1 && (
            <View style={styles.quickPrompts}>
              {QUICK_PROMPTS.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.promptBtn}
                  onPress={() => sendMessage(prompt)}
                  activeOpacity={0.7}
                >
                  <Text style={[text.bodyReg, styles.promptText]}>
                    {prompt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={[text.bodyReg, styles.input]}
            placeholder="Ask about a benefit..."
            placeholderTextColor={colors.neutral.gray400}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={
              styles.sendBtn}
            onPress={() => sendMessage(input)}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-up" size={20} color="#FEFDFD" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.teal50,
  },
  keyboardView: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },

  headerLabel: {
    color: colors.neutral.gray500,
    marginBottom: 4,
  },

  headerTitle: {
    color: '#1E293B',
  },

  divider: {
    height: 1,
    backgroundColor: colors.neutral.gray300,
  },

  // Messages
  messageList: {
    flex: 1,
  },

  messageContent: {
    padding: 20,
    gap: 12,
  },

  bubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 16,
  },

  aiBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
  },

  userBubble: {
    backgroundColor: colors.primary.teal900,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },

  aiText: {
    color: '#1E293B',
    lineHeight: 24,
  },

  userText: {
    color: '#FEFDFD',
  },

  // Quick prompts
  quickPrompts: {
    marginTop: 24,
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },

  promptBtn: {
    backgroundColor: colors.primary.teal100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary.teal300,
    padding: 16,
  },

  promptText: {
    color: colors.primary.teal900,
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: colors.primary.teal50,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray300,
    backgroundColor: '#FFFFFF',
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: colors.primary.teal50,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
  },

  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.teal500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});