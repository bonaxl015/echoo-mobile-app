import { PostCard } from '@features/posts/components/PostCard';
import { Post, PostResponse } from '@services/post/types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { RefObject, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { CommentListModalRef } from '../../comments/components/CommentListModal';
import { ConfirmDialogRef } from '../components/DeletePostDialog';

interface IUsePostListProps {
	postDeleteDialogRef: RefObject<ConfirmDialogRef | null>;
	commentListModalRef: RefObject<CommentListModalRef | null>;
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
	postDeleteDialogRef,
	commentListModalRef,
	hasNextPage,
	fetchNextPage
}: IUsePostListProps) {
	const renderItem: ListRenderItem<Post> = useCallback(
		({ item }) => (
			<PostCard
				{...item}
				postDeleteDialogRef={postDeleteDialogRef}
				commentListModalRef={commentListModalRef}
			/>
		),
		[postDeleteDialogRef, commentListModalRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
