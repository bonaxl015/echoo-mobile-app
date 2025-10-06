import { ICommentInputRef } from '@features/comments/components/CommentInput';
import { CommentItem } from '@features/comments/components/CommentItem';
import { Comment, CommentListResponse } from '@services/comment/types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { RefObject, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

interface IUseCommentListProps {
	postId: string;
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions
	) => Promise<
		InfiniteQueryObserverResult<
			InfiniteData<(CommentListResponse & { nextPage?: number }) | undefined, unknown>
		>
	>;
	commentInputRef: RefObject<ICommentInputRef | null>;
}

export default function useCommentListProps({
	postId,
	hasNextPage,
	fetchNextPage,
	commentInputRef
}: IUseCommentListProps) {
	const renderItem: ListRenderItem<Comment> = useCallback(
		({ item }) => <CommentItem {...item} postId={postId} commentInputRef={commentInputRef} />,
		[postId, commentInputRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
