import { PostCard } from '@features/posts/components/PostCard';
import { Post, PostResponse } from '@services/post/types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { RefObject, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { ConfirmDialogRef } from '../components/DeletePostDialog';
import { PostFormModalRef } from '../components/PostFormModal';

interface IUsePostListProps {
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmDialogRef | null>;
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions
	) => Promise<
		InfiniteQueryObserverResult<
			InfiniteData<(PostResponse & { nextPage?: number }) | undefined, unknown>
		>
	>;
}

export default function usePostListProps({
	postFormModalRef,
	postDeleteDialogRef,
	hasNextPage,
	fetchNextPage
}: IUsePostListProps) {
	const renderItem: ListRenderItem<Post> = useCallback(
		({ item }) => (
			<PostCard
				{...item}
				postFormModalRef={postFormModalRef}
				postDeleteDialogRef={postDeleteDialogRef}
			/>
		),
		[postDeleteDialogRef, postFormModalRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
