import FormTextInput from '@components/FormTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { forgotPasswordSchema } from '../validators/forgot-password';

export default function ForgotPasswordForm() {
	const theme = useTheme();
	const { forgotPasswordMutation, resendEmailMutation, isEmailSent, resendTimer } =
		useForgotPassword();

	const { control, handleSubmit, getValues } = useForm({
		resolver: yupResolver(forgotPasswordSchema),
		defaultValues: { email: '' }
	});

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
				<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
					<Text variant="headlineMedium" style={[styles.header, { color: theme.colors.primary }]}>
						Forgot Password
					</Text>

					<FormTextInput
						control={control as unknown as Control}
						name="email"
						label="Email"
						placeholder="Email"
					/>

					<Button
						mode="contained"
						onPress={handleSubmit((values) => forgotPasswordMutation.mutate(values))}
						loading={forgotPasswordMutation.isPending}
						style={styles.submitButton}
					>
						Send Reset Email
					</Button>

					{isEmailSent && (
						<View style={{ marginTop: 20, alignItems: 'center' }}>
							<Text
								style={{
									color: theme.colors.onSurfaceVariant
								}}
							>
								Didn't receive an email?
							</Text>
							<Button
								mode="text"
								disabled={resendTimer > 0 || resendEmailMutation.isPending}
								onPress={() => resendEmailMutation.mutate(getValues())}
								loading={resendEmailMutation.isPending}
								textColor={
									resendTimer > 0 || resendEmailMutation.isPending
										? theme.colors.onSurfaceDisabled
										: theme.colors.primary
								}
							>
								{resendTimer > 0 ? `Resend Email in ${resendTimer}s` : 'Resend Email'}
							</Button>
						</View>
					)}
				</Surface>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24
	},
	card: {
		padding: 20,
		borderRadius: 12,
		elevation: 2
	},
	header: {
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center'
	},
	submitButton: {
		marginTop: 12,
		borderRadius: 8
	}
});
