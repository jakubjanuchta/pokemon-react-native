import AsyncStorage from "@react-native-async-storage/async-storage";
import { TPokemon } from "../types/types";

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const storeData = async (key: string, value: TPokemon | null) => {
  try {
    const jsonValue = JSON.stringify(value || "");
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export { getData, storeData };
