import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import { Comment } from '@services/comment/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useGetCommentList } from '../hooks/useGetComments';
import { CommentItem } from './CommentItem';
import { CommentListFooter } from './CommentListFooter';

interface ICommentListModalContent {
	postId: string;
}

export function CommentListModalContent({ postId }: ICommentListModalContent) {
	const theme = useTheme();
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetCommentList(postId);

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
			<BottomSheetFlashList<Comment>
				data={comments}
				keyExtractor={(item: Comment, index: number) => item?.id ?? `comment-${index}`}
				renderItem={({ item }: { item: Comment }) => (
					<CommentItem {...item} postId={postId} displayMode="modal" />
				)}
				onEndReached={() => {
					if (hasNextPage) {
						fetchNextPage();
					}
				}}
				refreshing={isFetching}
				onEndReachedThreshold={5}
				contentContainerStyle={{ paddingBottom: 20 }}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="on-drag"
				removeClippedSubviews
				ListFooterComponent={
					<CommentListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
				}
			/>
		);
	})();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.colors.background
			}}
		>
			{renderContent}
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
