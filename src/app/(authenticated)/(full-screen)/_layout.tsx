import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function FullScreenStackLayout() {
	const theme = useTheme();

	return (
		<Stack
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.background },
				animation: 'slide_from_right'
			}}
		>
			<Stack.Screen
				name="view-post"
				options={{
					headerShown: false,
					gestureEnabled: true,
					gestureDirection: 'horizontal'
				}}
			/>
		</Stack>
	);
}
