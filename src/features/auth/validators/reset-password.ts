import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required')
});
