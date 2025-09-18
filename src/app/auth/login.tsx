import { useAuthStore } from '@store/useAuthStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function LoginScreen() {
	const logout = useAuthStore((s) => s.logout);
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text>Login page</Text>
			<Button
				onPress={() => {
					logout();
					router.replace('/auth/register');
				}}
			>
				Logout
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	}
});
