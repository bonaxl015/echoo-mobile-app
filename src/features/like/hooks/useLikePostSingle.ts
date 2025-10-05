import { likePost, unlikePost } from '@services/like';
import { Post } from '@services/post/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLikePostSingle() {
	const queryClient = useQueryClient();
	const queryKey = ['getPostById'];

	const optimisticUpdate = (liked: boolean) => {
		queryClient.setQueryData<Post>(queryKey, (old) => {
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
			await queryClient.cancelQueries({ queryKey });

			const previousPost = queryClient.getQueryData<Post>(queryKey);

			optimisticUpdate(true);

			return { previousPost };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPost) {
				queryClient.setQueryData(queryKey, context.previousPost);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey });
		}
	});

	const unlikeMutation = useMutation({
		mutationFn: unlikePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const previousPost = queryClient.getQueryData<Post>(queryKey);

			optimisticUpdate(false);

			return { previousPost };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPost) {
				queryClient.setQueryData(queryKey, context.previousPost);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey });
		}
	});

	return { likeMutation, unlikeMutation };
}
