import apiClient from '@services/apiClient';
import { AxiosError } from 'axios';
import { LoginFormData } from './types';
import { AUTH_API_URL } from './url';

export default async function submitLoginForm(data: LoginFormData) {
	try {
		const res = await apiClient.post(AUTH_API_URL.LOGIN, data);

		if (!res.data && res.status !== 200) {
			throw new Error(res.data.message);
		}

		return { token: res.data.token };
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
