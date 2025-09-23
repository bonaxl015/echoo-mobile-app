import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AppsTabLayout() {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.primary,
				tabBarPosition: 'top',
				tabBarStyle: {
					backgroundColor: theme.colors.surface
				},
				animation: 'shift',
				tabBarShowLabel: false
			}}
		>
			<Tabs.Screen
				name="newsfeed"
				options={{
					title: 'Newsfeed',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="dynamic-feed" size={size} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="settings" size={size} color={color} />
					)
				}}
			/>
		</Tabs>
	);
}
