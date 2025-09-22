export type UserForm = {
	name: string;
	email: string;
	password: string;
};

export type LoginFormData = Omit<UserForm, 'name'>;

export type RegisterFormData = UserForm;

export type ForgotPasswordFormData = Pick<UserForm, 'email'>;

export type ResetPasswordFormData = Pick<UserForm, 'password'>;
