import AsyncStorage from '@react-native-async-storage/async-storage';

// Toggles the saved state of a benefit by id.
// Reads from AsyncStorage, flips the saved boolean, saves back, and returns the updated data.
export async function toggleSavedBenefit(id) {

  // Load current benefits data from local storage
  const raw = await AsyncStorage.getItem('benefits');
  const data = JSON.parse(raw);
  
  // Flip saved state for the matching benefit, leave others unchanged
  data.benefits = data.benefits.map(b => 
    b.id === id ? { ...b, saved: !b.saved } : b
  );
  
  // Persist updated data back to local storage
  await AsyncStorage.setItem('benefits', JSON.stringify(data));
  
  return data;
}