import { create } from 'zustand';
import { LOCAL_STORAGE_KEYS, getAuthToken, setAuthToken, removeAuthToken, getUser, setUser, removeUser } from '../utils/localStorage';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types';
import { ROUTES } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  user: getUser(),
  token: getAuthToken(),
  isAuthenticated: !!getAuthToken(),
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}>((set) => ({
  ...initialState,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuthToken(data.token);
      setUser(data.user);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setAuthToken(data.token);
      setUser(data.user);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    removeAuthToken();
    removeUser();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    window.location.href = ROUTES.LOGIN;
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication check failed');
      }

      set({
        user: data.user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      removeAuthToken();
      removeUser();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Authentication check failed',
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));