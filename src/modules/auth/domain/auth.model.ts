/**
 * Domain Layer - Auth Module
 * Contiene las interfaces y tipos de datos del dominio de autenticación
 * Independiente de React y del framework
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  numberPhone: string;
  identificationNumber: string;
}

export interface VerifyOtpCredentials {
  email: string;
  otp: string;
}

export interface AuthResponse {
  accessToken: string;
  user?: UserAuth | null;
}

export interface UserAuth {
  id: string;
  email: string;
  username: string;
  numberPhone: string;
  accountStatus: string;
}

export interface TwoFactorToken {
  id: string;
  secret?: string;
  isEnabled: boolean;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  numberPhone: string;
  accountStatus: string;
  twoFactorToken?: TwoFactorToken;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: UserAuth | null;
  accessToken: string | null;
  isOtpRequired: boolean;
  loginAttempts: number;
  isLoginLocked: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  verifyOtp: (credentials: VerifyOtpCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}