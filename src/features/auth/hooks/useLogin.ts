import submitLoginForm from '@services/auth';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useLogin() {
	const router = useRouter();
	const setToken = useAuthStore((s) => s.setToken);

	const loginMutation = useMutation({
		mutationFn: submitLoginForm,
		onSuccess: (data) => {
			setToken(data?.token);
			router.replace('/newsfeed');
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

	return loginMutation;
}
