import { usePostDataContext } from '@provider/PostDataProvider';
import React from 'react';
import { IconButton } from 'react-native-paper';

interface IEditPostButton {
	postId: string;
	content: string;
}

export function EditPostButton({ postId, content }: IEditPostButton) {
	const { postFormModalRef } = usePostDataContext();

	const handleEditPost = () => {
		if (postId) {
			postFormModalRef.current?.updatePostFormData({ id: postId, content });
			postFormModalRef.current?.openModal();
		}
	};

	return <IconButton icon="pencil" onPress={handleEditPost} />;
}
