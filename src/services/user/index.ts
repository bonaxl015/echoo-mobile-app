import apiClient from '@services/apiClient';
import {
	UserCurrentInfoResponse,
	UserDeleteParams,
	UserDeleteResponse,
	UserProfileParams,
	UserProfileResponse,
	UserProfileUpdateParams,
	UserProfileUpdateResponse,
	UserUpdateProfilePhotoParams
} from './types';
import { USER_API_URL } from './url';

export async function getUserCurrentInfo() {
	try {
		const res = await apiClient.get<UserCurrentInfoResponse>(USER_API_URL.INFO);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
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

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function updateUserProfile(data: UserProfileUpdateParams) {
	try {
		const res = await apiClient.patch<UserProfileUpdateResponse>(USER_API_URL.UPDATE, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function updateUserProfilePhoto(data: UserUpdateProfilePhotoParams) {
	const formData = new FormData();

	const filename = data.fileUri.split('/').pop() ?? 'profile.jpg';
	const match = /\.(\w+)$/.exec(filename);
	const fileType = match ? `image/${match[1]}` : 'image';

	formData.append('photo', {
		uri: data.fileUri,
		type: fileType,
		name: filename
	} as any);

	try {
		const res = await apiClient.patch<UserProfileUpdateResponse>(
			USER_API_URL.UPLOAD_PROFILE_PHOTO,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function deleteUser(data: UserDeleteParams) {
	try {
		const res = await apiClient.delete<UserDeleteResponse>(USER_API_URL.DELETE, { data });

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
