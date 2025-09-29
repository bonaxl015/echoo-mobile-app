import { getPostById } from '@services/post';
import { useQuery } from '@tanstack/react-query';

export function useGetPostById(id: string) {
	return useQuery({
		queryKey: ['getPostById'],
		queryFn: () => getPostById({ id })
	});
}
