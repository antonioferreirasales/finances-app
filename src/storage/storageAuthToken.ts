import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from './storageConfig';
import { TokenDTO } from '@/dtos/TokenDTO';

export async function storageAuthToken(token: TokenDTO) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(token));
}

export async function storageAuthTokenGet() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const token: TokenDTO = storage ? JSON.parse(storage) : {};

  return token;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
