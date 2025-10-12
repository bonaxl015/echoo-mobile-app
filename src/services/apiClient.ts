import { ENV } from '@config/env';
import { PATHS } from '@constants/route';
import { STATUS_CODE } from '@constants/statusCodes';
import { useAuthStore } from '@store/useAuthStore';
import axios from 'axios';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const apiClient = axios.create({
	baseURL: ENV.BACKEND_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

apiClient.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
			const logout = useAuthStore.getState().logout;

			Toast.show({
				type: 'error',
				text1: 'Unauthorized',
				text2: error.response?.data.message || 'Please log in again'
			});

			logout();

			router.replace(PATHS.LOGIN);
		} else {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error.response?.data.message ?? error.message
			});
		}
	}
);

export default apiClient;
