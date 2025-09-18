import { AppQueryProvider } from '@services/QueryClientProvider';
import { darkTheme, lightTheme } from '@theme/paperTheme';
import { ColorScheme } from '@theme/types';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
	});

	const theme = colorScheme === ColorScheme.DARK ? darkTheme : lightTheme;

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PaperProvider theme={theme}>
				<AppQueryProvider>
					<Slot />
				</AppQueryProvider>
			</PaperProvider>
		</GestureHandlerRootView>
	);
}
