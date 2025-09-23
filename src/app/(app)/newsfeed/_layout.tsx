import { Stack } from 'expo-router';

export default function NewsfeedStackLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					gestureEnabled: true,
					gestureDirection: 'horizontal'
				}}
			/>
		</Stack>
	);
}
