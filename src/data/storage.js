import AsyncStorage from '@react-native-async-storage/async-storage';

export async function toggleSavedBenefit(id) {

  const raw = await AsyncStorage.getItem('benefits');
  const data = JSON.parse(raw);
  
  data.benefits = data.benefits.map(b => 
    b.id === id ? { ...b, saved: !b.saved } : b
  );
  
  await AsyncStorage.setItem('benefits', JSON.stringify(data));
  
  return data;
}