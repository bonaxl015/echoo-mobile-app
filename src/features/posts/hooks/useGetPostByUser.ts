import { getPostListByUser } from '@services/post';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetPostByUser(userId: string) {
	return useInfiniteQuery({
		queryKey: ['getPostByUser'],
		queryFn: ({ pageParam }) => getPostListByUser({ userId, pageParam }),
		getNextPageParam: (lastPage) => lastPage?.nextPage,
		initialPageParam: 1
	});
}
