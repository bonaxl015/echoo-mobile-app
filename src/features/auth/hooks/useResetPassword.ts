import { PATHS } from '@constants/route';
import { submitResetPasswordForm } from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useResetPassword() {
	const router = useRouter();

	return useMutation({
		mutationFn: submitResetPasswordForm,
		onSuccess: (data) => {
			if (data) {
				Toast.show({
					type: 'success',
					text1: 'Password Reset',
					text2: data.message,
					position: 'top'
				});

				router.replace(PATHS.LOGIN);
			}
		}
	});
}
