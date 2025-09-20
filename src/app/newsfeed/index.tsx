import { useAuthStore } from '@store/useAuthStore';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function NewsfeedScreen() {
	const token = useAuthStore((s) => s.token);
	const setToken = useAuthStore((s) => s.setToken);
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.replace('/auth/login');
		}
	}, [router, token]);

	return (
		<View style={styles.container}>
			<Text variant="headlineMedium">Newsfeed</Text>
			<Button
				onPress={() => {
					setToken(null);
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
		padding: 20
	}
});
