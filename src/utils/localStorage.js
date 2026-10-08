export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  SCHEMA_VERSION: 'schemaVersion',
};

export const CURRENT_SCHEMA_VERSION = '1';

export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

export const clear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export const checkSchemaVersion = () => {
  const storedVersion = getItem(LOCAL_STORAGE_KEYS.SCHEMA_VERSION);
  if (storedVersion !== CURRENT_SCHEMA_VERSION) {
    clear();
    setItem(LOCAL_STORAGE_KEYS.SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);
    return false;
  }
  return true;
};

export const getAuthToken = () => getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
export const setAuthToken = (token) => setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
export const removeAuthToken = () => removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

export const getUser = () => getItem(LOCAL_STORAGE_KEYS.USER);
export const setUser = (user) => setItem(LOCAL_STORAGE_KEYS.USER, user);
export const removeUser = () => removeItem(LOCAL_STORAGE_KEYS.USER);