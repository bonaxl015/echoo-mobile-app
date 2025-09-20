import FormTextInput from '@components/FormTextInput';
import { useRegister } from '@features/auth/hooks/useRegister';
import { registerSchema } from '@features/auth/validators/register';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

export default function RegisterForm() {
	const theme = useTheme();
	const router = useRouter();
	const registerMutation = useRegister();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '' }
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
					Register
				</Text>

				<FormTextInput
					control={control as unknown as Control}
					name="name"
					label="Name"
					placeholder="Name"
				/>
				<FormTextInput
					control={control as unknown as Control}
					name="email"
					label="Email"
					placeholder="Email"
				/>
				<FormTextInput
					control={control as unknown as Control}
					name="password"
					label="Password"
					placeholder="Password"
					secureTextEntry
				/>

				<Button
					mode="contained"
					onPress={handleSubmit((values) => registerMutation.mutate(values))}
					loading={registerMutation.isPending}
					style={styles.button}
				>
					Sign up
				</Button>

				<View style={styles.bottomText}>
					<Text style={{ color: theme.colors.onSurfaceVariant }}>Already have an account? </Text>
					<Text
						onPress={() => router.push('/auth/login')}
						style={[styles.registerText, { color: theme.colors.primary }]}
					>
						Login
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
