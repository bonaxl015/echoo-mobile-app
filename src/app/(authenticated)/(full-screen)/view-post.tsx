import { CommentInput, ICommentInputRef } from '@features/comments/components/CommentInput';
import { CommentListFooter } from '@features/comments/components/CommentListFooter';
import DeleteCommentDialog, {
	ConfirmDialogRef
} from '@features/comments/components/DeleteCommentDialog';
import useCommentListProps from '@features/comments/hooks/useCommentListProps';
import { useGetCommentList } from '@features/comments/hooks/useGetComments';
import DeletePostDialog from '@features/posts/components/DeletePostDialog';
import PostDetail from '@features/posts/components/PostDetail';
import { PostFormModal, PostFormModalRef } from '@features/posts/components/PostFormModal';
import { Comment } from '@services/comment/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewPostScreen() {
	const { post } = useLocalSearchParams<{ post: string }>();
	const parsedPost = post ? JSON.parse(post) : null;
	const commentInputRef = useRef<ICommentInputRef | null>(null);
	const commentDeleteRef = useRef<ConfirmDialogRef | null>(null);
	const postFormModalRef = useRef<PostFormModalRef>(null);
	const postDeleteDialogRef = useRef<ConfirmDialogRef>(null);
	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetCommentList(parsedPost.id);
	const { renderItem, onEndReached } = useCommentListProps({
		postId: parsedPost.id,
		hasNextPage,
		fetchNextPage,
		commentInputRef,
		commentDeleteRef
	});

	const comments = (data?.pages.flatMap((page) => page?.comments) as Comment[]) || [];

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<FlatList
					data={comments}
					keyExtractor={(item, index) => item?.id ?? `comment-${index}`}
					renderItem={renderItem}
					onEndReached={onEndReached}
					onEndReachedThreshold={5}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
					initialNumToRender={5}
					maxToRenderPerBatch={10}
					windowSize={5}
					contentContainerStyle={{ paddingBottom: 20 }}
					removeClippedSubviews
					refreshing={isFetching}
					onRefresh={() => refetch()}
					ListHeaderComponent={
						<PostDetail
							{...parsedPost}
							commentInputRef={commentInputRef}
							postFormModalRef={postFormModalRef}
							postDeleteDialogRef={postDeleteDialogRef}
						/>
					}
					ListFooterComponent={
						<CommentListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
					}
				/>
				<CommentInput ref={commentInputRef} postId={parsedPost?.id} />
			</SafeAreaView>

			{/* Delete comment dialog */}
			<DeleteCommentDialog ref={commentDeleteRef} postId={parsedPost?.id} />

			{/* Edit posts */}
			<PostFormModal ref={postFormModalRef} />

			{/* Delete post dialog */}
			<DeletePostDialog ref={postDeleteDialogRef} />
		</>
	);
}
