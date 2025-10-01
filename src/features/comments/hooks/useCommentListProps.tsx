import { ICommentInputRef } from '@features/comments/components/CommentInput';
import { CommentItem } from '@features/comments/components/CommentItem';
import { ConfirmDialogRef } from '@features/comments/components/DeleteCommentDialog';
import { Comment, CommentListResponse } from '@services/comment/types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { RefObject, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

interface IUseCommentListProps {
	hasNextPage: boolean;
	fetchNextPage: (
		options?: FetchNextPageOptions
	) => Promise<
		InfiniteQueryObserverResult<
			InfiniteData<(CommentListResponse & { nextPage?: number }) | undefined, unknown>
		>
	>;
	commentInputRef: RefObject<ICommentInputRef | null>;
	commentDeleteRef: RefObject<ConfirmDialogRef | null>;
}

export default function useCommentListProps({
	hasNextPage,
	fetchNextPage,
	commentInputRef,
	commentDeleteRef
}: IUseCommentListProps) {
	const renderItem: ListRenderItem<Comment> = useCallback(
		({ item }) => (
			<CommentItem
				{...item}
				commentInputRef={commentInputRef}
				commentDeleteRef={commentDeleteRef}
			/>
		),
		[commentInputRef, commentDeleteRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
