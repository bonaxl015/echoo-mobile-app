import { PATHS } from '@constants/route';
import { submitLoginForm } from '@services/auth';
import { getUserCurrentInfo } from '@services/user';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

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
		},
		onError: (error) => {
			Toast.show({
				type: 'error',
				text1: 'Login Failed',
				text2: error.message,
				position: 'top'
			});
		}
	});
}
