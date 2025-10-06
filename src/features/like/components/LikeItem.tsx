import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

interface ILikeItem {
	userProfilePhoto: string;
	userName: string;
}

export function LikeItem({ userProfilePhoto, userName }: ILikeItem) {
	const theme = useTheme();

	return (
		<View style={styles.item}>
			<IconButton icon="thumb-up" size={20} iconColor={theme.colors.primary} />
			<Image source={{ uri: userProfilePhoto }} style={styles.avatar} />
			<Text style={styles.name}>{userName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8
	},
	avatar: {
		height: 36,
		width: 36,
		borderRadius: 18,
		marginHorizontal: 8
	},
	name: {
		fontSize: 16
	}
});
