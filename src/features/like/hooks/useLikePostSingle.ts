import { likePost, unlikePost } from '@services/like';
import { Post } from '@services/post/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLikePostSingle() {
	const queryClient = useQueryClient();

	const optimisticUpdate = (liked: boolean) => {
		queryClient.setQueryData<Post>(['getPostById'], (old) => {
			if (!old) return old;

			return {
				...old,
				isLikedByCurrentUser: liked,
				likesCount: liked ? old.likesCount + 1 : old.likesCount - 1
			};
		});
	};

	const likeMutation = useMutation({
		mutationFn: likePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['getPostById'] });

			const previousPost = queryClient.getQueryData<Post>(['getPostById']);

			optimisticUpdate(true);

			return { previousPost };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPost) {
				queryClient.setQueryData(['getPostById'], context.previousPost);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getPostById'] });
		}
	});

	const unlikeMutation = useMutation({
		mutationFn: unlikePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['getPostById'] });

			const previousPost = queryClient.getQueryData<Post>(['getPostById']);

			optimisticUpdate(false);

			return { previousPost };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPost) {
				queryClient.setQueryData(['getPostById'], context.previousPost);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getPostById'] });
		}
	});

	return { likeMutation, unlikeMutation };
}
