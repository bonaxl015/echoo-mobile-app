import { InfiniteComments } from '@features/comments/types';
import { InfinitePosts } from '@features/posts/types';
import { Comment } from '@services/comment/types';
import { Post } from '@services/post/types';
import { QueryClient } from '@tanstack/react-query';

export function updatePostCommentInInfiniteQuery(
	queryClient: QueryClient,
	queryKey: string[],
	optimisticComment: Comment
) {
	queryClient.setQueryData<InfiniteComments>(queryKey, (old) => {
		if (!old) return old;

		return {
			...old,
			pages: old.pages.map((page) => ({
				...page,
				comments: page.comments.map((item, index) =>
					index === 0
						? {
								optimisticComment,
								...item
							}
						: item
				)
			}))
		};
	});
}

export function updatePostCommentCountInInfiniteQuery(
	queryClient: QueryClient,
	queryKey: string[],
	postId: string,
	delta: number
) {
	queryClient.setQueryData<InfinitePosts>(queryKey, (old) => {
		if (!old) return old;

		return {
			...old,
			pages: old.pages.map((page) => ({
				...page,
				data: page.posts.map((item) =>
					item.id === postId
						? {
								...item,
								commentsCount: Math.max(0, (item.commentsCount ?? 0) + delta)
							}
						: item
				)
			}))
		};
	});
}

export function updateSinglePostCommentsCount(
	queryClient: QueryClient,
	queryKey: string[],
	postId: string,
	delta: number
) {
	queryClient.setQueryData<Post>(queryKey, (old) => {
		if (!old) return old;

		if (old.id !== postId) return old;

		return {
			...old,
			commentsCount: Math.max(0, (old.commentsCount ?? 0) + delta)
		};
	});
}
