import { useLikeCommentList } from '@features/like/hooks/useLikeCommentList';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={toggleLike}
				disabled={likeMutation.isPending || unlikeMutation.isPending}
				style={{ width: 40, justifyContent: 'center' }}
			>
				<Text
					style={{
						color: isLikedByCurrentUser ? theme.colors.primary : theme.colors.onSurface,
						fontWeight: isLikedByCurrentUser ? 'bold' : '200'
					}}
				>
					Like
				</Text>
			</TouchableOpacity>
		</View>
	);
}
