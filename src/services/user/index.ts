import apiClient from '@services/apiClient';
import { AxiosError } from 'axios';
import {
	UserCurrentInfoResponse,
	UserDeleteParams,
	UserDeleteResponse,
	UserProfileParams,
	UserProfileResponse,
	UserProfileUpdateParams,
	UserProfileUpdateResponse
} from './types';
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

export async function getUserProfile(data: UserProfileParams) {
	try {
		const params = { id: data.id };
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<UserProfileResponse>(
			`${USER_API_URL.PROFILE}?${urlStringParams.toString()}`
		);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function updateUserProfile(data: UserProfileUpdateParams) {
	try {
		const res = await apiClient.patch<UserProfileUpdateResponse>(USER_API_URL.UPDATE, data);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function deleteUser(data: UserDeleteParams) {
	try {
		const res = await apiClient.delete<UserDeleteResponse>(USER_API_URL.DELETE, { data });

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
