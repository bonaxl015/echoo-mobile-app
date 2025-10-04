import { common } from '@theme/colors';
import { useTheme } from 'react-native-paper';
import Toast, { BaseToast, ErrorToast, ToastConfig, ToastProps } from 'react-native-toast-message';

export function CustomToast() {
	const theme = useTheme();

	const toastConfig: ToastConfig = {
		success: (props: ToastProps) => (
			<BaseToast
				{...props}
				style={{
					backgroundColor: theme.colors.surface,
					borderLeftColor: common.success
				}}
				text1Style={{ color: theme.colors.onSurface, fontSize: 16 }}
				text2Style={{ color: theme.colors.onSurface, fontSize: 12 }}
			/>
		),
		error: (props: ToastProps) => (
			<ErrorToast
				{...props}
				style={{
					backgroundColor: theme.colors.surface,
					borderLeftColor: common.danger
				}}
				text1Style={{ color: theme.colors.onSurface, fontSize: 16 }}
				text2Style={{ color: theme.colors.onSurface, fontSize: 12 }}
			/>
		)
	};

	return <Toast config={toastConfig} position="top" topOffset={60} />;
}
