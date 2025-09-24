import ConfirmDialog from '@components/ConfirmDialog';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDeletePost } from '../hooks/useDeletePost';

export interface ConfirmDialogRef {
	openDialog: () => void;
	closeDialog: () => void;
	updateDeleteData: (data: DeleteData) => void;
}

export type DeleteData = {
	id: string | null;
};

const DeletePostDialog = forwardRef<ConfirmDialogRef>((_props, ref) => {
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [deleteData, setDeleteData] = useState<DeleteData>({
		id: null
	});
	const openDialog = () => setDialogVisible(true);
	const closeDialog = () => setDialogVisible(false);
	const updateDeleteData = (data: DeleteData) => setDeleteData(data);
	const deletePostMutation = useDeletePost(closeDialog);

	const handleConfirm = () => {
		deletePostMutation.mutate({ id: deleteData.id });
	};

	const handleCancel = () => {
		updateDeleteData({ id: null });
		closeDialog();
	};

	useImperativeHandle(ref, () => ({
		openDialog,
		closeDialog,
		updateDeleteData
	}));

	return (
		<ConfirmDialog
			content="Are you sure you want to delete this post? This action cannot be undone"
			onConfirm={handleConfirm}
			onCancel={handleCancel}
			dialogVisible={dialogVisible}
		/>
	);
});

export default DeletePostDialog;
