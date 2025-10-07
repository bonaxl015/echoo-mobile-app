import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface IUserProfileInfo {
	name: string;
	profilePhoto: string;
	bio: string;
}

export function UserProfileInfo({ name, bio, profilePhoto }: IUserProfileInfo) {
	const theme = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<Image source={{ uri: profilePhoto }} style={styles.avatar} />
			<Text style={[styles.name, { color: theme.colors.onSurface }]}>{name}</Text>
			<Text style={[styles.bio, { color: theme.colors.onSurface }]}>{bio}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 16
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 8
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	bio: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 4,
		paddingHorizontal: 16
	}
});
