import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../services';
import { useAuthStore } from '../../store';
import { handleApiError } from '../../utils';
import type { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse } from '../../types';

export function useLogin() {
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setToken(data.access_token);
        },
        onError: (error) => {
            throw handleApiError(error);
        },
    });
}

export function useRegister() {
    return useMutation<RegisterResponse, Error, RegisterRequest>({
        mutationFn: registerUser,
        onError: (error) => {
            throw handleApiError(error);
        },
    });
}
