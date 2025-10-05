import { Comment } from '@services/comment/types';
import React, { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import useCommentListProps from '../hooks/useCommentListProps';
import { useGetCommentList } from '../hooks/useGetComments';
import { CommentInput, ICommentInputRef } from './CommentInput';
import { CommentListFooter } from './CommentListFooter';
import DeleteCommentDialog, { ConfirmDialogRef } from './DeleteCommentDialog';

interface ICommentListContent {
	postId: string;
}

export function CommentListContent({ postId }: ICommentListContent) {
	const theme = useTheme();
	const commentInputRef = useRef<ICommentInputRef | null>(null);
	const commentDeleteRef = useRef<ConfirmDialogRef | null>(null);
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetCommentList(postId);
	const { renderItem, onEndReached } = useCommentListProps({
		postId,
		hasNextPage,
		fetchNextPage,
		commentInputRef,
		commentDeleteRef
	});

	const comments = (data?.pages.flatMap((page) => page?.comments) as Comment[]) || [];

	const renderContent = (() => {
		if (isLoading) {
			return (
				<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
					<View style={styles.center}>
						<ActivityIndicator size="large" color={theme.colors.primary} />
					</View>
				</View>
			);
		}

		if (!comments.length) {
			return (
				<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
					<View style={styles.center}>
						<Text style={{ color: theme.colors.onSurfaceVariant }}>No comments to display</Text>
					</View>
				</View>
			);
		}

		return (
			<FlatList
				data={comments}
				keyExtractor={(item, index) => item?.id ?? `comment-${index}`}
				renderItem={renderItem}
				onEndReached={onEndReached}
				refreshing={isFetching}
				onEndReachedThreshold={5}
				keyboardShouldPersistTaps="handled"
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={5}
				contentContainerStyle={{ paddingBottom: 20 }}
				removeClippedSubviews
				ListFooterComponent={
					<CommentListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
				}
			/>
		);
	})();

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			{renderContent}
			<CommentInput ref={commentInputRef} postId={postId} />

			{/* Delete comment dialog */}
			<DeleteCommentDialog ref={commentDeleteRef} postId={postId} />
		</View>
	);
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
