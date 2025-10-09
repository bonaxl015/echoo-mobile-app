import { updateUserProfile } from '@services/user';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useUpdateUserProfile() {
	const setUser = useAuthStore((s) => s.setUser);

	return useMutation({
		mutationFn: updateUserProfile,
		onSuccess: async (data) => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post updated successfully'
			});

			if (data?.user) {
				setUser(data.user);
			}
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not update user data'
			});
		}
	});
}
