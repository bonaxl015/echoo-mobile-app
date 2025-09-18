import { AppQueryProvider } from '@services/QueryClientProvider';
import { darkTheme, lightTheme } from '@theme/paperTheme';
import { ColorScheme } from '@theme/types';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function App() {
	const colorScheme = useColorScheme();
	const theme = colorScheme === ColorScheme.DARK ? darkTheme : lightTheme;

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
