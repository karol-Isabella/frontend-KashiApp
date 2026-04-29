/**
 * API Endpoints
 * Centraliza todas las rutas de la API del backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  },
  DASHBOARD: {
    ROOT: `${API_BASE_URL}/dashboard`,
  },
} as const;
