import { PATHS } from '@constants/route';
import { submitLoginForm } from '@services/auth';
import { getUserCurrentInfo } from '@services/user';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export function useLogin() {
	const router = useRouter();
	const setToken = useAuthStore((s) => s.setToken);
	const setUser = useAuthStore((s) => s.setUser);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: submitLoginForm,
		onSuccess: async (data) => {
			if (data) {
				setToken(data.token);

				const userData = await queryClient.fetchQuery({
					queryKey: ['getCurrentUserInfo'],
					queryFn: getUserCurrentInfo
				});

				if (userData?.user) {
					setUser(userData?.user);
				}

				router.replace(PATHS.NEWSFEED);
			}
		}
	});
}
