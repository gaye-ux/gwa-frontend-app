import { api } from './api';

export interface RegisterPayload {
  phoneNumber: string;
  fullName: string;
  pin: string;
}

export interface LoginPayload {
  phoneNumber: string;
  pin: string;
}

export interface RequestOtpPayload {
  phoneNumber: string;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
}

export interface AuthUser {
  phoneNumber: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', payload),

  requestOtp: (payload: RequestOtpPayload) =>
    api.post<{ message: string }>('/auth/request-otp', payload),

  verifyOtp: (payload: VerifyOtpPayload) =>
    api.post<AuthResponse>('/auth/verify-otp', payload),

  getProfile: () =>
    api.get<AuthUser>('/auth/profile'),
};
