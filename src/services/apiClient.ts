import { ENV } from '@config/env';
import { useAuthStore } from '@store/useAuthStore';
import axios from 'axios';

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

export default apiClient;
