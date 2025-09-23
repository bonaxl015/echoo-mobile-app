import apiClient from '@services/apiClient';
import { AxiosError } from 'axios';
import { UserCurrentInfoResponse } from './types';
import { USER_API_URL } from './url';

export async function getUserCurrentInfo() {
	try {
		const res = await apiClient.get<UserCurrentInfoResponse>(USER_API_URL.INFO);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
