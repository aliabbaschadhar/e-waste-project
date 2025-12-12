import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'RESTAURANT' | 'ADMIN';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'RESTAURANT' | 'ADMIN';
  token: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'RESTAURANT' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export const authAPI = {
  signup: (data: SignupData) => api.post<AuthResponse>('/api/auth/signup', data),
  login: (data: LoginData) => api.post<AuthResponse>('/api/auth/login', data),
  getProfile: () => api.get<UserProfile>('/api/auth/me'),
  logout: () => api.post('/api/auth/logout'),
};

export default api;
