import React from 'react';
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

interface IFormTextInput {
	control: Control<FieldValues, any, FieldValues>;
	name: string;
	label: string;
	placeholder: string;
	secureTextEntry?: boolean;
	rules?: Omit<
		RegisterOptions<FieldValues, FieldPath<FieldValues>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
}

export default function FormTextInput({
	control,
	name,
	label,
	secureTextEntry,
	rules,
	placeholder
}: IFormTextInput) {
	const theme = useTheme();

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
				<View style={{ marginBottom: 12 }}>
					<TextInput
						label={label}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry={secureTextEntry}
						mode="outlined"
						error={!!error}
						style={{ marginBottom: 0 }}
						placeholder={placeholder}
						theme={{
							colors: {
								text: theme.colors.onSurface,
								placeholder: theme.colors.onSurfaceVariant,
								primary: error ? theme.colors.error : theme.colors.primary
							}
						}}
					/>

					{error && (
						<Text variant="labelSmall" style={[styles.errorText, { color: theme.colors.error }]}>
							{error.message?.toString()}
						</Text>
					)}
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	errorText: {
		marginTop: 4,
		marginLeft: 4
	}
});
