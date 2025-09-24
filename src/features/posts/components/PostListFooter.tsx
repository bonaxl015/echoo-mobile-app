import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

interface IPostListFooter {
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
}

export default function PostListFooter({ isFetchingNextPage, hasNextPage }: IPostListFooter) {
	const theme = useTheme();

	if (isFetchingNextPage) {
		return (
			<View style={{ alignItems: 'center' }}>
				<ActivityIndicator size="small" color={theme.colors.primary} />
			</View>
		);
	}

	if (!isFetchingNextPage && hasNextPage) return null;

	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={{ color: theme.colors.onSurfaceVariant }}>You have read all of the posts</Text>
		</View>
	);
}
