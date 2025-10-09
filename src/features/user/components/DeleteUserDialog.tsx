import ConfirmDialog from '@components/ConfirmDialog';
import { useAuthStore } from '@store/useAuthStore';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDeleteUser } from '../hooks/useDeleteUser';

export interface ConfirmUserDeleteDialogRef {
	openDialog: () => void;
	closeDialog: () => void;
}

const DeleteUserDialog = forwardRef<ConfirmUserDeleteDialogRef>((_props, ref) => {
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const { user } = useAuthStore();
	const deleteUserMutation = useDeleteUser();

	const openDialog = () => setDialogVisible(true);
	const closeDialog = () => setDialogVisible(false);

	const handleConfirm = () => {
		if (user?.id) {
			deleteUserMutation.mutate({ id: user.id });
		}
	};

	useImperativeHandle(ref, () => ({
		openDialog,
		closeDialog
	}));

	return (
		<ConfirmDialog
			content="Are you sure you want to delete your account? This action cannot be undone"
			onConfirm={handleConfirm}
			onCancel={closeDialog}
			dialogVisible={dialogVisible}
		/>
	);
});

export default DeleteUserDialog;
