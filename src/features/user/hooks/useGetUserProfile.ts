import { getUserProfile } from '@services/user';
import { useQuery } from '@tanstack/react-query';

export function useGetUserProfile(id: string) {
	return useQuery({
		queryKey: ['getUserProfile'],
		queryFn: () => getUserProfile({ id })
	});
}
