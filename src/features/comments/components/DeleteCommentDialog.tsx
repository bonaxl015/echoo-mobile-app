import ConfirmDialog from '@components/ConfirmDialog';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDeleteComment } from '../hooks/useDeleteComment';

export interface ConfirmCommentDeleteDialogRef {
	openDialog: () => void;
	closeDialog: () => void;
	updateDeleteData: (data: DeleteData) => void;
}

export type DeleteData = {
	commentId: string | null;
	postId: string | null;
};

const DeleteCommentDialog = forwardRef<ConfirmCommentDeleteDialogRef>((_props, ref) => {
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [deleteData, setDeleteData] = useState<DeleteData>({
		commentId: null,
		postId: null
	});
	const openDialog = () => setDialogVisible(true);
	const closeDialog = () => setDialogVisible(false);
	const updateDeleteData = (data: DeleteData) => setDeleteData(data);
	const deleteCommentMutation = useDeleteComment(deleteData.postId as string, closeDialog);

	const handleConfirm = () => {
		const { commentId, postId } = deleteData;

		if (commentId && postId) {
			deleteCommentMutation.mutate({ id: commentId, postId });
		}
	};

	const handleCancel = () => {
		updateDeleteData({ commentId: null, postId: null });
		closeDialog();
	};

	useImperativeHandle(ref, () => ({
		openDialog,
		closeDialog,
		updateDeleteData
	}));

	return (
		<ConfirmDialog
			content="Are you sure you want to delete this comment? This action cannot be undone"
			onConfirm={handleConfirm}
			onCancel={handleCancel}
			dialogVisible={dialogVisible}
		/>
	);
});

export default DeleteCommentDialog;
