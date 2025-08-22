/* global console */
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Retrieve the access token from AsyncStorage
  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  // Store the access token in AsyncStorage
  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  }

  // Remove the access token from AsyncStorage
  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  }
}

export default AuthStorage;
