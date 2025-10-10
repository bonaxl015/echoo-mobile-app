import { CommentInput, ICommentInputRef } from '@features/comments/components/CommentInput';
import { CommentListFooter } from '@features/comments/components/CommentListFooter';
import useCommentListProps from '@features/comments/hooks/useCommentListProps';
import { useGetCommentList } from '@features/comments/hooks/useGetComments';
import PostDetail from '@features/posts/components/PostDetail';
import { Comment } from '@services/comment/types';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewPostScreen() {
	const { post } = useLocalSearchParams<{ post: string }>();
	const parsedPost = post ? JSON.parse(post) : null;
	const commentInputRef = useRef<ICommentInputRef | null>(null);
	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetCommentList(parsedPost.id);
	const { renderItem, onEndReached } = useCommentListProps({
		postId: parsedPost.id,
		hasNextPage,
		fetchNextPage,
		commentInputRef
	});

	const comments = (data?.pages.flatMap((page) => page?.comments) as Comment[]) || [];

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<FlashList
					data={comments}
					keyExtractor={(item, index) => item?.id ?? `comment-${index}`}
					renderItem={renderItem}
					onEndReached={onEndReached}
					onEndReachedThreshold={5}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
					contentContainerStyle={{ paddingBottom: 20 }}
					removeClippedSubviews
					refreshing={isFetching}
					onRefresh={() => refetch()}
					ListHeaderComponent={<PostDetail {...parsedPost} commentInputRef={commentInputRef} />}
					ListFooterComponent={
						<CommentListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
					}
				/>
				<CommentInput ref={commentInputRef} postId={parsedPost?.id} />
			</SafeAreaView>
		</>
	);
}
