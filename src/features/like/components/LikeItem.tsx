import { PATHS } from '@constants/route';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

interface ILikeItem {
	userProfilePhoto: string;
	userName: string;
	userId: string;
}

export function LikeItem({ userProfilePhoto, userName, userId }: ILikeItem) {
	const theme = useTheme();
	const router = useRouter();

	const handleViewProfile = () => {
		if (userId) {
			router.push({
				pathname: PATHS.VIEW_USER_PROFILE,
				params: { userId }
			});
		}
	};

	return (
		<TouchableOpacity onPress={handleViewProfile}>
			<View style={styles.item}>
				<IconButton icon="thumb-up" size={20} iconColor={theme.colors.primary} />
				<Image source={{ uri: userProfilePhoto }} style={styles.avatar} />
				<Text style={styles.name}>{userName}</Text>
			</View>
		</TouchableOpacity>
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
