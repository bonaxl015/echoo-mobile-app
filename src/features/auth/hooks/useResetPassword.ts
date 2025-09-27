import { submitResetPasswordForm } from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useResetPassword() {
	const router = useRouter();

	const resetPasswordMutation = useMutation({
		mutationFn: submitResetPasswordForm,
		onSuccess: (data) => {
			Toast.show({
				type: 'success',
				text1: 'Password Reset',
				text2: data?.message,
				position: 'top'
			});
			router.replace('/auth/login');
		},
		onError: (error) => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error.message,
				position: 'top'
			});
		}
	});

	return resetPasswordMutation;
}
