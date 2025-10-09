import { PATHS } from '@constants/route';
import { deleteUser } from '@services/user';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useDeleteUser() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: async () => {
			logout();

			router.replace(PATHS.LOGIN);

			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Your account has been deleted successfully'
			});
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not delete your account'
			});
		}
	});
}
