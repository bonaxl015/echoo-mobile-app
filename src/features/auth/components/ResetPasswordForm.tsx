import FormTextInput from '@components/FormTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { useResetPassword } from '../hooks/useResetPassword';
import { resetPasswordSchema } from '../validators/reset-password';

export default function ResetPasswordForm() {
	const theme = useTheme();
	const resetPasswordMutation = useResetPassword();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(resetPasswordSchema),
		defaultValues: { password: '' }
	});

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
				<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
					<Text variant="headlineMedium" style={[styles.header, { color: theme.colors.primary }]}>
						Reset Password
					</Text>

					<FormTextInput
						control={control as unknown as Control}
						name="password"
						label="Password"
						placeholder="Password"
						secureTextEntry
					/>

					<Button
						mode="contained"
						onPress={handleSubmit((values) => resetPasswordMutation.mutate(values))}
						loading={resetPasswordMutation.isPending}
						style={styles.submitButton}
					>
						Update Password
					</Button>
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
