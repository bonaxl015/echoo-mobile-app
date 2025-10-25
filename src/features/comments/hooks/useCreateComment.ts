import { createComment } from '@services/comment';
import { Comment } from '@services/comment/types';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	updatePostCommentCountInInfiniteQuery,
	updatePostCommentInInfiniteQuery,
	updateSinglePostCommentsCount
} from '@utils/queryHelpers';
import Toast from 'react-native-toast-message';

export function useCreateComment() {
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);

	return useMutation({
		mutationFn: createComment,
		onSuccess: async (data) => {
			if (data) {
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'Comment added successfully'
				});
			}
		},
		onMutate: async (newCommentInput) => {
			const { postId, content } = newCommentInput;

			// Cancel relevant queries
			await Promise.all([
				queryClient.cancelQueries({ queryKey: ['getCommentList', postId] }),
				queryClient.cancelQueries({ queryKey: ['getPostList'] }),
				queryClient.cancelQueries({ queryKey: ['getPostByUser'] }),
				queryClient.cancelQueries({ queryKey: ['getPostById'] })
			]);

			const prevComments = queryClient.getQueryData(['getCommentList', postId]);
			const prevPostList = queryClient.getQueryData(['getPostList']);
			const prevUserPost = queryClient.getQueryData(['getPostByUser']);
			const prevSinglePost = queryClient.getQueryData(['getPostById']);

			const optimisticComment: Comment = {
				id: `tmp-${Date.now()}`,
				postId,
				content,
				authorId: user?.id ?? 'tmp-user-id',
				authorName: user?.name ?? 'User',
				authorProfilePhoto: user?.profilePhoto ?? '',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				likesCount: 0,
				isLikedByCurrentUser: false
			};

			updatePostCommentInInfiniteQuery(queryClient, ['getCommentList', postId], optimisticComment);
			updatePostCommentCountInInfiniteQuery(queryClient, ['getPostList'], postId, 1);
			updatePostCommentCountInInfiniteQuery(queryClient, ['getPostByUser'], postId, 1);
			updateSinglePostCommentsCount(queryClient, ['getPostById'], postId, 1);

			return {
				prevComments,
				prevPostList,
				prevUserPost,
				prevSinglePost,
				optimisticCommentId: optimisticComment.id
			};
		},
		onError: (_err, variables, context) => {
			const postId = variables.postId;

			if (context?.prevComments) {
				queryClient.setQueryData(['getCommentList', postId], context.prevComments);
			}
			if (context?.prevPostList) {
				queryClient.setQueryData(['getPostList'], context.prevPostList);
			}
			if (context?.prevUserPost) {
				queryClient.setQueryData(['getPostByUser'], context.prevUserPost);
			}
			if (context?.prevSinglePost) {
				queryClient.setQueryData(['getPostById'], context.prevSinglePost);
			}
		},
		onSettled: async (_data, _error, variables) => {
			const postId = variables.postId;

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['getCommentList', postId] }),
				queryClient.invalidateQueries({ queryKey: ['getPostList'] }),
				queryClient.invalidateQueries({ queryKey: ['getPostByUser'] }),
				queryClient.invalidateQueries({ queryKey: ['getPostById'] })
			]);
		}
	});
}
