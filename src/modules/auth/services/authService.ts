/**
 * Auth Service
 * Realiza todas las peticiones HTTP relacionadas con autenticación
 * Devuelve DTOs del backend sin procesar
 */

import { apiClient } from '../../../services/apiClient';
import { ENDPOINTS } from '../../../services/endpoint';
import { LoginCredentials, RegisterCredentials } from '../domain/auth.model';

export interface AuthTokenDTO {
  token: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  username: string;
  numberPhone: string;
  accountStatus: string;
  twoFactorToken?: {
    id: string;
    secret?: string;
    isEnabled: boolean;
    createdAt?: string;
  };
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthTokenDTO> {
    const response = await apiClient.post<AuthTokenDTO>(ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('Error during logout:', error);
    } finally {
      apiClient.clearToken();
    }
  }

  async register(credentials: RegisterCredentials): Promise<UserResponseDTO> {
    const response = await apiClient.post<UserResponseDTO>(ENDPOINTS.AUTH.REGISTER, {
      email: credentials.email,
      password: credentials.password,
      username: credentials.username,
      numberPhone: credentials.numberPhone,
      identificationNumber: credentials.identificationNumber,
    });
    return response.data;
  }

  async verifyOtp(email: string, otp: string): Promise<AuthTokenDTO> {
    const response = await apiClient.post<AuthTokenDTO>(ENDPOINTS.AUTH.VERIFY_OTP, {
      email,
      otp,
    });
    return response.data;
  }
}

export const authService = new AuthService();
