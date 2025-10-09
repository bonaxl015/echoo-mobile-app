export type UserForm = {
	name: string;
	email: string;
	password: string;
};

export type LoginFormData = Omit<UserForm, 'name'>;

export type RegisterFormData = UserForm;

export type ForgotPasswordFormData = Pick<UserForm, 'email'>;

export type ResetPasswordFormData = Pick<UserForm, 'password'>;

export type LoginResponse = {
	token: string;
};

export type RegisterResponse = LoginResponse;

export type ForgotPasswordResponse = {
	message: string;
};

export type ResetPasswordResponse = ForgotPasswordResponse;

export type LogoutResponse = ForgotPasswordResponse;
