/**
 * API Endpoints
 * Centraliza todas las rutas de la API del backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  USER: {
    PROFILE: `${API_BASE_URL}/users/me`,
    BLOCK_PROFILE: `${API_BASE_URL}/users/me/block`,
    DELETE_PROFILE: `${API_BASE_URL}/users/me/delete`,
  },
  WALLET: {
    BALANCE: `${API_BASE_URL}/wallet/balance`,
    VISIBILITY: `${API_BASE_URL}/wallet/visibility`,
  },
} as const;
