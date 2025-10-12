import { PostCard } from '@features/posts/components/PostCard';
import { Post, PostResponse } from '@services/post/types';
import { ListRenderItem } from '@shopify/flash-list';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { useCallback } from 'react';

interface IUsePostListProps {
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions
	) => Promise<
		InfiniteQueryObserverResult<
			InfiniteData<(PostResponse & { nextPage?: number }) | undefined, unknown>
		>
	>;
}

export default function usePostListProps({ hasNextPage, fetchNextPage }: IUsePostListProps) {
	const renderItem: ListRenderItem<Post> = useCallback(({ item }) => <PostCard {...item} />, []);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
