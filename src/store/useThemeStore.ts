import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme } from '@theme/types';
import { Appearance } from 'react-native';
import { create } from 'zustand';

export type ThemeMode = ColorScheme;

interface ThemeStore {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
	mode: Appearance.getColorScheme() === ColorScheme.DARK ? ColorScheme.DARK : ColorScheme.LIGHT,
	setMode: async (mode: ThemeMode) => {
		await AsyncStorage.setItem('themeMode', mode);

		set({ mode });
	},
	toggleMode: async () => {
		const current = get().mode;
		const next = current === ColorScheme.DARK ? ColorScheme.LIGHT : ColorScheme.DARK;

		await AsyncStorage.setItem('themeMode', next);

		set({ mode: next });
	}
}));
