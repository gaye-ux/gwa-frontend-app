// Storage abstraction — swap implementation easily
// For production: install @react-native-async-storage/async-storage
// or expo-secure-store and replace InMemoryStorage below.

interface StorageBackend {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

class InMemoryStorage implements StorageBackend {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }
}

export const StorageKeys = {
  AUTH_TOKEN: '@gwa/auth_token',
  USER_DATA: '@gwa/user_data',
};

export const storage: StorageBackend = new InMemoryStorage();
export type { StorageBackend };
