import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
	id: string;
	name: string;
	bio: string;
	profilePhoto: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	profilePhotoPublicId: string;
}

interface AuthState {
	token: string | null;
	user: User | null;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	logout: () => void;
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			setToken: (token: string | null) => set({ token }),
			setUser: (user: User | null) => set({ user }),
			logout: () => {
				set({ token: null, user: null });
				AsyncStorage.removeItem('auth-storage');
			},
			hasHydrated: false,
			setHasHydrated: (state: boolean) => set({ hasHydrated: state })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			}
		}
	)
);
