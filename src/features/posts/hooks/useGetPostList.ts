import { getPostList } from '@services/post';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetPostList() {
	return useInfiniteQuery({
		queryKey: ['getPostList'],
		queryFn: getPostList,
		getNextPageParam: (lastPage) => lastPage?.nextPage,
		initialPageParam: 1
	});
}
