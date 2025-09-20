import { submitRegistrationForm } from '@services/auth';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useRegister() {
	const router = useRouter();
	const setToken = useAuthStore((s) => s.setToken);

	const registerMutation = useMutation({
		mutationFn: submitRegistrationForm,
		onSuccess: (data) => {
			setToken(data?.token);
			router.replace('/newsfeed');
		},
		onError: (error) => {
			Toast.show({
				type: 'error',
				text1: 'Registration Failed',
				text2: error.message,
				position: 'top'
			});
		}
	});

	return registerMutation;
}
