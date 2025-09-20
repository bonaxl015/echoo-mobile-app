import FormTextInput from '@components/FormTextInput';
import { useLogin } from '@features/auth/hooks/useLogin';
import { loginSchema } from '@features/auth/validators/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

export default function LoginForm() {
	const theme = useTheme();
	const router = useRouter();
	const loginMutation = useLogin();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: { email: '', password: '' }
	});

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
				Echoo
			</Text>
			<Surface
				style={[
					styles.formContainer,
					{
						backgroundColor: theme.colors.surface,
						shadowColor: theme.colors.shadow
					}
				]}
			>
				<Text variant="titleLarge" style={[styles.formTitle, { color: theme.colors.onSurface }]}>
					Login
				</Text>

				<FormTextInput
					control={control as unknown as Control}
					name="email"
					label="Email"
					placeholder="Email"
					rules={{ required: 'Email is required' }}
				/>
				<FormTextInput
					control={control as unknown as Control}
					name="password"
					label="Password"
					placeholder="Password"
					secureTextEntry
					rules={{ required: 'Password is required' }}
				/>

				<Button
					mode="contained"
					onPress={handleSubmit((values) => loginMutation.mutate(values))}
					loading={loginMutation.isPending}
					style={styles.button}
				>
					Sign in
				</Button>

				<View style={styles.bottomText}>
					<Text style={{ color: theme.colors.onSurfaceVariant }}>No account yet? </Text>
					<Text
						onPress={() => router.push('/auth/register')}
						style={[styles.registerText, { color: theme.colors.primary }]}
					>
						Register
					</Text>
				</View>
			</Surface>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 40
	},
	formContainer: {
		padding: 20,
		borderRadius: 12,
		elevation: 2
	},
	formTitle: {
		marginBottom: 16,
		fontWeight: '600'
	},
	button: {
		marginTop: 16,
		borderRadius: 8
	},
	registerText: {
		fontWeight: 'bold'
	},
	bottomText: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center'
	}
});
