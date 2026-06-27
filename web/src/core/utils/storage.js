/**
 * Corporate SaaS Storage Helper
 * Maneja el acceso seguro a localStorage con namespaces por tenant/empresa
 */

const PREFIX = 'fenix1_saas_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage for key ${key}:`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage for key ${key}:`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
    }
  },
  
  clearAll: () => {
    try {
      const keys = Object.keys(window.localStorage);
      keys.forEach(key => {
        if (key.startsWith(PREFIX)) {
          window.localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
