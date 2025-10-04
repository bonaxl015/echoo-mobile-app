import { darkTheme, lightTheme } from '@theme/paperTheme';
import { ColorScheme } from '@theme/types';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { AppQueryProvider } from 'provider/QueryClientProvider';
import React, { useEffect } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	useColorScheme
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Portal } from 'react-native-paper';
import Toast from 'react-native-toast-message';

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
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				>
					<PaperProvider theme={theme}>
						<AppQueryProvider>
							<Portal.Host>
								<Slot />
								<Toast />
							</Portal.Host>
						</AppQueryProvider>
					</PaperProvider>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</GestureHandlerRootView>
	);
}
