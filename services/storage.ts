import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageBackend {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

class AsyncStorageBackend implements StorageBackend {
  async get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

export const StorageKeys = {
  AUTH_TOKEN: '@gwa/auth_token',
  USER_DATA: '@gwa/user_data',
};

export const storage: StorageBackend = new AsyncStorageBackend();
export type { StorageBackend };
