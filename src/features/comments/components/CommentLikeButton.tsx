import { useLikeCommentList } from '@features/like/hooks/useLikeCommentList';
import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

interface ICommentLikeButton {
	postId: string;
	commentId: string;
	isLikedByCurrentUser: boolean;
}

export function CommentLikeButton({ postId, commentId, isLikedByCurrentUser }: ICommentLikeButton) {
	const theme = useTheme();
	const { likeMutation, unlikeMutation } = useLikeCommentList(postId);

	const toggleLike = () => {
		if (isLikedByCurrentUser) {
			unlikeMutation.mutate({ commentId, postId });
		} else {
			likeMutation.mutate({ commentId, postId });
		}
	};

	return (
		<IconButton
			size={20}
			icon={isLikedByCurrentUser ? 'thumb-up' : 'thumb-up-outline'}
			iconColor={isLikedByCurrentUser ? theme.colors.primary : undefined}
			onPress={toggleLike}
			disabled={likeMutation.isPending || unlikeMutation.isPending}
		/>
	);
}
