
import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_KEY = 'userName';
export const LANG_KEY = 'language';

export const loadValue = async (key: string, setValue: Function) => {
  try {
    let userAux= await AsyncStorage.getItem(key);
    setValue(userAux)
    console.log(key + ' loaded ', userAux)
  } catch (e) {
    console.error('Failed to load key ', key)
  }
}

export const getValue = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Failed get key ', key);
  }
}

export const saveValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log("Item saved ", value);
  } catch (e) {
    console.error('Failed to save value ', value);
  }
}

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    console.error('Error deleting item ', key)
  }

  console.log('Item delete ', key)
}