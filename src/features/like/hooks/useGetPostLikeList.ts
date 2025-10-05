import { getPostLikeList } from '@services/like';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetPostLikeList(postId: string) {
	return useInfiniteQuery({
		queryKey: ['getPostLikeList', postId],
		queryFn: ({ pageParam }) => getPostLikeList({ postId, pageParam }),
		getNextPageParam: (lastPage) => lastPage?.nextPage,
		initialPageParam: 1
	});
}
