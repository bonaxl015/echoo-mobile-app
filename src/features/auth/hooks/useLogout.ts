import { PATHS } from '@constants/route';
import { logoutUser } from '@services/auth';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useLogout() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);

	return useMutation({
		mutationFn: logoutUser,
		onSuccess: async (data) => {
			if (data) {
				logout();

				router.replace(PATHS.LOGIN);

				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'You have been logged out'
				});
			}
		}
	});
}
