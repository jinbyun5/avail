import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/onboarding/SplashScreen';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import Quiz1Screen from './src/screens/onboarding/Quiz1Screen';
import Quiz2Screen from './src/screens/onboarding/Quiz2Screen';
import Quiz3Screen from './src/screens/onboarding/Quiz3Screen';
import Quiz4Screen from './src/screens/onboarding/Quiz4Screen';
import Quiz5Screen from './src/screens/onboarding/Quiz5Screen';
import LoadingScreen from './src/screens/onboarding/LoadingScreen';

import HomeScreen    from './src/screens/HomeScreen';
import BenefitsScreen from './src/screens/BenefitsScreen';
import AskScreen     from './src/screens/AskScreen';
import ProfileScreen  from './src/screens/ProfileScreen';
import BenefitDetailScreen from './src/screens/BenefitDetailScreen';

import { colors, text } from './src/styles/Appstyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_ICONS = {
  Home:     { focused: 'home',           outline: 'home-outline' },
  Benefits: { focused: 'search',         outline: 'search-outline' },
  Ask:      { focused: 'chatbubble',     outline: 'chatbubble-outline' },
  Profile:  { focused: 'person',         outline: 'person-outline' },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.outline;
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? colors.primary.teal900 : colors.neutral.gray500}
            />
          );
        },
        tabBarActiveTintColor:   colors.primary.teal900,
        tabBarInactiveTintColor: colors.neutral.gray400,
        tabBarLabelStyle: {
          ...text.label,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.neutral.gray300,
          borderTopColor:  colors.neutral.gray300,
          borderTopWidth:  1,
          paddingTop: 8,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Benefits" component={BenefitsScreen} />
      <Tab.Screen name="Ask"      component={AskScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style="dark" />
      {!fontsLoaded ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary.teal50 }}>
          <ActivityIndicator color={colors.primary.teal500} />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash"   component={SplashScreen} />
            <Stack.Screen name="Welcome"  component={WelcomeScreen} />
            <Stack.Screen name="Quiz1"    component={Quiz1Screen} />
            <Stack.Screen name="Quiz2"    component={Quiz2Screen} />
            <Stack.Screen name="Quiz3"    component={Quiz3Screen} />
            <Stack.Screen name="Quiz4"    component={Quiz4Screen} />
            <Stack.Screen name="Quiz5"    component={Quiz5Screen} />
            <Stack.Screen name="Loading"  component={LoadingScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="BenefitDetail" component={BenefitDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}
