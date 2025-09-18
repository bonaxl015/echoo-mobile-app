import { useAuthStore } from '@store/useAuthStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function RegisterScreen() {
	const setToken = useAuthStore((s) => s.setToken);
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text>Register page</Text>
			<Button
				onPress={() => {
					setToken('test-token');
					router.replace('/auth/login');
				}}
			>
				Login
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
