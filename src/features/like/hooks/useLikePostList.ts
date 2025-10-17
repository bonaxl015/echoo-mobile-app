import { NORMALIZED_PATHS } from '@constants/route';
import { likePost, unlikePost } from '@services/like';
import { Post } from '@services/post/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'expo-router';

interface InfinitePosts {
	pages: {
		posts: Post[];
		nextPage?: number;
	}[];
	pageParams: unknown[];
}

export function useLikePostList(postId: string) {
	const queryClient = useQueryClient();
	const pathname = usePathname();
	const queryKey = (() => {
		if (pathname === NORMALIZED_PATHS.NEWSFEED) {
			return ['getPostList'];
		}

		if (pathname === NORMALIZED_PATHS.PROFILE) {
			return ['getPostByUser'];
		}

		return [''];
	})();

	const optimisticUpdate = (liked: boolean) => {
		queryClient.setQueryData<InfinitePosts>(queryKey, (old) => {
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
			await queryClient.cancelQueries({ queryKey });

			const previousPosts = queryClient.getQueryData<InfinitePosts>(queryKey);

			optimisticUpdate(true);

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

	const unlikeMutation = useMutation({
		mutationFn: unlikePost,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const previousPosts = queryClient.getQueryData<InfinitePosts>(queryKey);

			optimisticUpdate(false);

			return { previousPosts };
		},
		onError: (_err, _postId, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(queryKey, context.previousPosts);
			}
		},
		onSettled: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['getPostList'] }),
				queryClient.invalidateQueries({ queryKey: ['getPostByUser'] })
			]);
		}
	});

	return { likeMutation, unlikeMutation };
}
