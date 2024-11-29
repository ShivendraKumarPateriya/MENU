import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string, password: string) => {
        const storedUser = localStorage.getItem('admin_credentials');
        const credentials = storedUser 
          ? JSON.parse(storedUser) 
          : { username: 'admin', password: 'admin123' };

        if (username === credentials.username && password === credentials.password) {
          set({ user: { username, password }, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateCredentials: (username: string, password: string) => {
        localStorage.setItem('admin_credentials', JSON.stringify({ username, password }));
        set({ user: { username, password } });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export { useAuthStore };