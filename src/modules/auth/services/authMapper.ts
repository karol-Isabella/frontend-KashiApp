/**
 * Auth Mapper
 * Transforma los DTOs del backend al modelo del frontend
 */

import { AuthResponse, UserProfile } from '../domain/auth.model';
import { AuthTokenDTO, UserResponseDTO } from './authService';

export const mapAuthFromApi = (dto: AuthTokenDTO): AuthResponse => {
  return {
    accessToken: dto.token,
    user: null,
  };
};

export const mapUserProfileFromApi = (dto: UserResponseDTO): UserProfile => {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    numberPhone: dto.numberPhone,
    accountStatus: dto.accountStatus,
    twoFactorToken: dto.twoFactorToken ? {
      id: dto.twoFactorToken.id,
      secret: dto.twoFactorToken.secret,
      isEnabled: dto.twoFactorToken.isEnabled,
      createdAt: dto.twoFactorToken.createdAt,
    } : undefined,
  };
};
