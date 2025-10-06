import { usePostDataContext } from '@provider/PostDataProvider';
import React from 'react';
import { IconButton } from 'react-native-paper';

interface IDeletePostButton {
	postId: string;
}

export function DeletePostButton({ postId }: IDeletePostButton) {
	const { postDeleteDialogRef } = usePostDataContext();

	const handleDeletePost = () => {
		if (postId) {
			postDeleteDialogRef.current?.updateDeleteData({ id: postId });
			postDeleteDialogRef.current?.openDialog();
		}
	};

	return <IconButton icon="delete" onPress={handleDeletePost} />;
}
