import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { common, dark, light } from './colors';

export const lightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...common,
		...light
	}
};

export const darkTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...common,
		...dark
	}
};
