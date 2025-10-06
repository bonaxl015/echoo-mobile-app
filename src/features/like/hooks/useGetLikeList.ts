import { getCommentLikeList, getPostLikeList } from '@services/like';
import { useInfiniteQuery } from '@tanstack/react-query';

export const QUERY_TYPE = {
	POST: 'POST',
	COMMENT: 'COMMENT'
} as const;

export function useGetLikeList(id: string, type: keyof typeof QUERY_TYPE) {
	return useInfiniteQuery({
		queryKey: type === QUERY_TYPE.POST ? ['getPostLikeList', id] : ['getCommentLikeList', id],
		queryFn:
			type === QUERY_TYPE.POST
				? ({ pageParam }) => getPostLikeList({ postId: id, pageParam })
				: ({ pageParam }) => getCommentLikeList({ commentId: id, pageParam }),
		getNextPageParam: (lastPage) => lastPage?.nextPage,
		initialPageParam: 1
	});
}
