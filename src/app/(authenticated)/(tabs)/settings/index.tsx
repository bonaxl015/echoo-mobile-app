import { PATHS } from '@constants/route';
import { useLogout } from '@features/auth/hooks/useLogout';
import { useAuthStore } from '@store/useAuthStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, List, Switch, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
	const theme = useTheme();
	const router = useRouter();
	const { user } = useAuthStore();
	const logoutMutation = useLogout();

	const redirectToProfile = () => {
		router.push(PATHS.VIEW_USER_PROFILE_TAB);
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{/* User section */}
				<TouchableOpacity style={styles.profileContainer} onPress={redirectToProfile}>
					<Avatar.Image source={{ uri: user?.profilePhoto }} />
					<View style={{ marginLeft: 12 }}>
						<Text variant="titleMedium">{user?.name}</Text>
					</View>
				</TouchableOpacity>

				{/* Edit Profile */}
				<List.Item
					title="Edit Profile"
					containerStyle={[styles.listItem, { backgroundColor: theme.colors.surface }]}
					contentStyle={styles.listContent}
					left={(props) => <List.Icon {...props} icon="account-edit" />}
					onPress={() => {}}
				/>

				{/* Theme toggle */}
				<List.Item
					title="Dark Mode"
					containerStyle={[styles.listItem, { backgroundColor: theme.colors.surface }]}
					contentStyle={styles.listContent}
					left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
					right={() => <Switch value={true} />}
				/>

				{/* Delete account */}
				<List.Item
					title="Delete Account"
					containerStyle={[styles.listItem, { backgroundColor: theme.colors.surface }]}
					contentStyle={styles.listContent}
					titleStyle={{ color: theme.colors.error }}
					left={(props) => <List.Icon {...props} icon="delete" />}
					onPress={() => {}}
				/>

				{/* Logout */}
				<List.Item
					title="Logout"
					containerStyle={[styles.listItem, { backgroundColor: theme.colors.surface }]}
					contentStyle={styles.listContent}
					left={(props) => <List.Icon {...props} icon="logout" />}
					onPress={() => logoutMutation.mutate()}
				/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	listItem: {
		borderRadius: 30
	},
	listContent: {
		height: 50
	}
});
