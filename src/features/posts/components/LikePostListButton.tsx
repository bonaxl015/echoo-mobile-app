import { useLikePostList } from '@features/like/hooks/useLikePostList';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

interface IPostLike {
	postId: string;
	isLikedByCurrentUser: boolean;
}

export function LikePostListButton({ postId, isLikedByCurrentUser }: IPostLike) {
	const theme = useTheme();
	const { likeMutation, unlikeMutation } = useLikePostList(postId);

	const toggleLike = () => {
		if (isLikedByCurrentUser) {
			unlikeMutation.mutate({ postId });
		} else {
			likeMutation.mutate({ postId });
		}
	};

	return (
		<IconButton
			icon={isLikedByCurrentUser ? 'thumb-up' : 'thumb-up-outline'}
			iconColor={isLikedByCurrentUser ? theme.colors.primary : undefined}
			style={styles.footerButton}
			onPress={toggleLike}
			disabled={likeMutation.isPending || unlikeMutation.isPending}
		/>
	);
}

const styles = StyleSheet.create({
	footerButton: {
		flex: 1,
		margin: 0,
		height: 50
	}
});
