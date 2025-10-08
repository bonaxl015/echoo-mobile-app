import { CommentLikeListResponse, LikeObject, PostLikeListResponse } from '@services/like/types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { LikeItem } from '../components/LikeItem';

interface IUseLikeListProps {
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions
	) => Promise<
		InfiniteQueryObserverResult<
			InfiniteData<
				| (
						| (PostLikeListResponse & { nextPage?: number })
						| (CommentLikeListResponse & { nextPage?: number })
				  )
				| undefined,
				unknown
			>
		>
	>;
}

export default function useLikeListProps({ hasNextPage, fetchNextPage }: IUseLikeListProps) {
	const renderItem: ListRenderItem<LikeObject> = useCallback(
		({ item }) => (
			<LikeItem
				userProfilePhoto={item.userProfilePhoto}
				userName={item.userName}
				userId={item.userId}
			/>
		),
		[]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
