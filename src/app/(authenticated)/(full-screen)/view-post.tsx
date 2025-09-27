import { CommentInput } from '@features/comments/components/CommentInput';
import { CommentListFooter } from '@features/comments/components/CommentListFooter';
import useCommentListProps from '@features/comments/hooks/useCommentListProps';
import { useGetCommentList } from '@features/comments/hooks/useGetComments';
import PostDetail from '@features/posts/components/PostDetail';
import { Comment } from '@services/comment/types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewPostScreen() {
	const theme = useTheme();
	const { post } = useLocalSearchParams<{ post: string }>();
	const parsedPost = post ? JSON.parse(post) : null;
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetCommentList(
		parsedPost.id
	);
	const { renderItem, onEndReached } = useCommentListProps({
		isLoading,
		hasNextPage,
		fetchNextPage
	});

	const comments = (data?.pages.flatMap((page) => page?.comments) as Comment[]) || [];

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<FlatList
				data={comments}
				keyExtractor={(item, index) => item.id ?? `comment-${index}`}
				renderItem={renderItem}
				onEndReached={onEndReached}
				onEndReachedThreshold={5}
				keyboardShouldPersistTaps="handled"
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={5}
				removeClippedSubviews
				ListHeaderComponent={<PostDetail {...parsedPost} />}
				ListFooterComponent={
					<CommentListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
				}
			/>
			<CommentInput onSubmit={(content) => console.log('comment content', content)} />
		</SafeAreaView>
	);
}
