import React from 'react';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';

export interface IConfirmDialog {
	title?: string;
	content: string;
	onCancel: () => void;
	onConfirm: () => void;
	confirmLabel?: string;
	cancelLabel?: string;
	dialogVisible: boolean;
}

export default function ConfirmDialog({
	title,
	content,
	cancelLabel = 'Cancel',
	confirmLabel = 'Confirm',
	onCancel,
	onConfirm,
	dialogVisible
}: IConfirmDialog) {
	const theme = useTheme();

	return (
		<Portal>
			<Dialog
				visible={dialogVisible}
				dismissable
				onDismiss={onCancel}
				style={{ backgroundColor: theme.colors.background }}
			>
				{title && <Dialog.Title style={{ color: theme.colors.onSurface }}>{title}</Dialog.Title>}
				<Dialog.Content>
					<Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
						{content}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onCancel} textColor={theme.colors.onSurfaceVariant} uppercase>
						{cancelLabel}
					</Button>
					<Button onPress={onConfirm} textColor={theme.colors.primary} uppercase>
						{confirmLabel}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
