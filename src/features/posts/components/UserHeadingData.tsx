import { PATHS } from '@constants/route';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface IPostHeaderUserData {
	authorId?: string | null;
	authorProfilePhoto?: string;
	authorName?: string;
	createdAt?: string;
	type: 'post' | 'comment';
}

export function UserHeadingData({
	authorId,
	authorProfilePhoto,
	authorName,
	createdAt,
	type
}: IPostHeaderUserData) {
	const router = useRouter();
	const theme = useTheme();

	const handleViewProfile = () => {
		if (authorId) {
			router.push({
				pathname: PATHS.VIEW_USER_PROFILE,
				params: { userId: authorId }
			});
		}
	};

	const isPost = type === 'post';

	return (
		<TouchableOpacity onPress={handleViewProfile}>
			<View style={styles.headerLeft}>
				<Avatar.Image size={isPost ? 40 : 36} source={{ uri: authorProfilePhoto }} />
				<View style={{ marginLeft: 8 }}>
					<Text variant={isPost ? 'titleMedium' : 'titleSmall'}>{authorName}</Text>
					<Text
						variant={isPost ? 'labelMedium' : 'labelSmall'}
						style={{ color: theme.colors.onSurfaceVariant }}
					>
						{createdAt}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
