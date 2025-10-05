import { Comment } from '@services/comment/types';
import { likeComment, unlikeComment } from '@services/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InfiniteComments {
	pages: {
		comments: Comment[];
		nextPage?: number;
	}[];
	pageParams: unknown[];
}

export function useLikeCommentList(postId: string) {
	const queryClient = useQueryClient();
	const queryKey = ['getCommentList', postId];

	const optimisticUpdate = (commentId: string, liked: boolean) => {
		queryClient.setQueryData<InfiniteComments>(queryKey, (old) => {
			if (!old) return old;

			return {
				...old,
				pages: old.pages.map((page) => ({
					...page,
					comments: page.comments.map((c) =>
						c.id === commentId
							? {
									...c,
									isLikedByCurrentUser: liked,
									likesCount: liked ? c.likesCount + 1 : c.likesCount - 1
								}
							: c
					)
				}))
			};
		});
	};

	const likeMutation = useMutation({
		mutationFn: likeComment,
		onMutate: async ({ commentId }) => {
			await queryClient.cancelQueries({ queryKey });

			const previousComments = queryClient.getQueryData<InfiniteComments>(queryKey);

			optimisticUpdate(commentId, true);

			return { previousComments };
		},
		onError: (_err, _commentId, context) => {
			if (context?.previousComments) {
				queryClient.setQueryData(queryKey, context.previousComments);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey });
		}
	});

	const unlikeMutation = useMutation({
		mutationFn: unlikeComment,
		onMutate: async ({ commentId }) => {
			await queryClient.cancelQueries({ queryKey });

			const previousPosts = queryClient.getQueryData<InfiniteComments>(queryKey);

			optimisticUpdate(commentId, false);

			return { previousPosts };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(queryKey, context.previousPosts);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey });
		}
	});

	return { likeMutation, unlikeMutation };
}
