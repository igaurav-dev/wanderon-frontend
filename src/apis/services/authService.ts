import { axiosInstance } from '../axiosInstance';
import type { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse } from '../../types';

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
}

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosInstance.post<RegisterResponse>('/auth/register', data);
    return response.data;
}
