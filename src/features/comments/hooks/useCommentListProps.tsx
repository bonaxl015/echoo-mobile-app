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
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

interface IUseCommentListProps {
	isLoading: boolean;
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
	isLoading,
	hasNextPage,
	fetchNextPage,
	commentInputRef,
	commentDeleteRef
}: IUseCommentListProps) {
	const theme = useTheme();

	const renderItem: ListRenderItem<Comment> = useCallback(
		({ item }) => {
			if (isLoading) {
				return (
					<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
						<View style={styles.center}>
							<ActivityIndicator size="large" color={theme.colors.primary} />
						</View>
					</View>
				);
			}

			return (
				<CommentItem
					{...item}
					commentInputRef={commentInputRef}
					commentDeleteRef={commentDeleteRef}
				/>
			);
		},
		[isLoading, theme.colors.background, theme.colors.primary, commentInputRef, commentDeleteRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
