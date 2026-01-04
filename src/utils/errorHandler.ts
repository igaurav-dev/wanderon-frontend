import axios from 'axios';
import { ApiException } from '../exceptions';
import type { ApiErrorResponse } from '../types';

interface AxiosErrorWithAuth extends Error {
    isAuthError?: boolean;
    response?: {
        status: number;
        data: ApiErrorResponse;
    };
}

export function handleApiError(error: unknown): ApiException {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosErrorWithAuth;

        if (axiosError.isAuthError) {
            return ApiException.unauthorized();
        }

        if (!axiosError.response) {
            return ApiException.networkError();
        }

        const data = axiosError.response.data;
        return ApiException.fromResponse(
            axiosError.response.status,
            data.message || 'An unexpected error occurred'
        );
    }

    if (error instanceof ApiException) {
        return error;
    }

    return new ApiException(500, 'An unexpected error occurred');
}

export function getErrorMessage(error: unknown): string {
    const apiError = handleApiError(error);
    return apiError.userMessage;
}

export function isAuthError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
        return (error as AxiosErrorWithAuth).isAuthError === true;
    }
    return false;
}
