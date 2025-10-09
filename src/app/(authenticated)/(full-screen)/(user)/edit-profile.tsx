import { UpdateUserForm } from '@features/user/components/UpdateUserForm';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<Text variant="headlineMedium" style={styles.headingText}>
				Update Profile
			</Text>
			<UpdateUserForm />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headingText: {
		textAlign: 'center',
		marginTop: 20
	}
});
