import { likePost, unlikePost } from '@services/like';
import { Post } from '@services/post/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InfinitePosts {
	pages: {
		posts: Post[];
		nextPage?: number;
	}[];
	pageParams: unknown[];
}

export function useLikePostList(postId: string) {
	const queryClient = useQueryClient();

	const optimisticUpdate = (liked: boolean) => {
		queryClient.setQueryData<InfinitePosts>(['getPostList'], (old) => {
			if (!old) return old;

			return {
				...old,
				pages: old.pages.map((page) => ({
					...page,
					posts: page.posts.map((p) =>
						p.id === postId
							? {
									...p,
									isLikedByCurrentUser: liked,
									likesCount: liked ? p.likesCount + 1 : p.likesCount - 1
								}
							: p
					)
				}))
			};
		});
	};

	const likeMutation = useMutation({
		mutationFn: likePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['getPostList'] });

			const previousPosts = queryClient.getQueryData<InfinitePosts>(['getPostList']);

			optimisticUpdate(true);

			return { previousPosts };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(['getPostList'], context.previousPosts);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getPostList'] });
		}
	});

	const unlikeMutation = useMutation({
		mutationFn: unlikePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['getPostList'] });

			const previousPosts = queryClient.getQueryData<InfinitePosts>(['getPostList']);

			optimisticUpdate(false);

			return { previousPosts };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(['getPostList'], context.previousPosts);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getPostList'] });
		}
	});

	return { likeMutation, unlikeMutation };
}
