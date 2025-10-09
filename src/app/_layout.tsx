import { CustomToast } from '@components/Toast';
import { AppQueryProvider } from '@provider/QueryClientProvider';
import { useThemeStore } from '@store/useThemeStore';
import { darkTheme, lightTheme } from '@theme/paperTheme';
import { ColorScheme } from '@theme/types';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Portal } from 'react-native-paper';

export default function RootLayout() {
	const mode = useThemeStore((s) => s.mode);
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
	});

	const theme = mode === ColorScheme.DARK ? darkTheme : lightTheme;

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
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				>
					<PaperProvider theme={theme}>
						<AppQueryProvider>
							<Portal.Host>
								<Slot />
								<CustomToast />
							</Portal.Host>
						</AppQueryProvider>
					</PaperProvider>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</GestureHandlerRootView>
	);
}
