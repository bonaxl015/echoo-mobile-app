import { usePostDataContext } from '@provider/PostDataProvider';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface IViewPostLikesButton {
	likesCount?: number;
	postId?: string | null;
}

export function ViewPostLikesButton({ likesCount, postId }: IViewPostLikesButton) {
	const theme = useTheme();
	const { likeListModalRef } = usePostDataContext();

	const handleViewLikes = () => {
		if (postId) {
			likeListModalRef.current?.updatePostId(postId);
			likeListModalRef.current?.openModal();
		}
	};

	if (!likesCount) {
		return null;
	}

	return (
		<TouchableOpacity onPress={handleViewLikes}>
			<Text
				variant="labelLarge"
				style={{ color: theme.colors.onSurfaceVariant, textAlign: 'left' }}
			>
				{likesCount} {Number(likesCount) > 1 ? 'Likes' : 'Like'}
			</Text>
		</TouchableOpacity>
	);
}
