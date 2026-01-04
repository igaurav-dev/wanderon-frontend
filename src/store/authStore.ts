import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setToken: (token: string) => void;
    logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,

            setToken: (token: string) => {
                set({ token, isAuthenticated: true });
            },

            logout: () => {
                set({ token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
