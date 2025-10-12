import { LikesList } from '@features/like/components/LikesList';
import { QUERY_TYPE } from '@features/like/hooks/useGetLikeList';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

type ViewLikesParams = {
	postId?: string;
	commentId?: string;
};

export default function ViewLikesScreen() {
	const { postId, commentId } = useLocalSearchParams<ViewLikesParams>();

	if (postId) {
		return <LikesList id={postId} type={QUERY_TYPE.POST} />;
	}

	if (commentId) {
		return <LikesList id={commentId} type={QUERY_TYPE.COMMENT} />;
	}

	return null;
}
