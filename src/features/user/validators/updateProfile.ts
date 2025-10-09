import * as yup from 'yup';

export const updateUserSchema = yup.object({
	name: yup.string().required('Name is required'),
	bio: yup.string().optional()
});
