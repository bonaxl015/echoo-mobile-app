import { getCommentList } from '@services/comment';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetCommentList(postId: string) {
	return useInfiniteQuery({
		queryKey: ['getCommentList', postId],
		queryFn: ({ pageParam = 1 }) => getCommentList({ postId, pageParam }),
		getNextPageParam: (lastPage) => lastPage?.nextPage,
		initialPageParam: 1
	});
}
