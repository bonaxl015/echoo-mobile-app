import { PostDataProvider } from '@provider/PostDataProvider';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AuthenticatedStackLayout() {
	const theme = useTheme();

	return (
		<PostDataProvider>
			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: theme.colors.background },
					animation: 'slide_from_right',
					gestureEnabled: true,
					freezeOnBlur: false
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
						gestureEnabled: true,
						gestureDirection: 'horizontal'
					}}
				/>
				<Stack.Screen
					name="(full-screen)"
					options={{
						presentation: 'transparentModal',
						headerShown: false,
						gestureEnabled: true,
						gestureDirection: 'horizontal'
					}}
				/>
			</Stack>
		</PostDataProvider>
	);
}
