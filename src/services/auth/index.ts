import apiClient from '@services/apiClient';
import {
	ForgotPasswordFormData,
	ForgotPasswordResponse,
	LoginFormData,
	LoginResponse,
	LogoutResponse,
	RegisterFormData,
	RegisterResponse,
	ResetPasswordFormData,
	ResetPasswordResponse
} from './types';
import { AUTH_API_URL } from './url';

export async function submitLoginForm(data: LoginFormData) {
	try {
		const res = await apiClient.post<LoginResponse>(AUTH_API_URL.LOGIN, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function submitRegistrationForm(data: RegisterFormData) {
	try {
		const res = await apiClient.post<RegisterResponse>(AUTH_API_URL.REGISTER, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function submitForgotPasswordForm(data: ForgotPasswordFormData) {
	try {
		const res = await apiClient.post<ForgotPasswordResponse>(AUTH_API_URL.FORGOT_PASSWORD, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function submitResetPasswordForm(data: ResetPasswordFormData) {
	try {
		const res = await apiClient.post<ResetPasswordResponse>(AUTH_API_URL.RESET_PASSWORD, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function logoutUser() {
	try {
		const res = await apiClient.post<LogoutResponse>(AUTH_API_URL.LOGOUT);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
