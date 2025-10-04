import { AppModal } from '@components/AppModal';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { PostForm } from './PostForm';

export interface PostFormModalRef {
	openModal: () => void;
	closeModal: () => void;
	updatePostFormData: (value: PostFormData) => void;
}

export type PostFormData = {
	id: string | null;
	content: string;
};

export const PostFormModal = forwardRef<PostFormModalRef>((_props, ref) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [postFormData, setPostFormData] = useState<PostFormData>({
		id: null,
		content: ''
	});

	const openModal = () => setModalVisible(true);
	const closeModal = () => {
		setPostFormData({ id: null, content: '' });
		setModalVisible(false);
	};

	const createPostMutation = useCreatePost(closeModal);
	const updatePostMutation = useUpdatePost(closeModal);

	const updatePostFormData = (value: PostFormData) => setPostFormData(value);

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
		updatePostFormData
	}));

	const handleFormSubmit = postFormData.id
		? (content: string) => updatePostMutation.mutate({ id: postFormData.id, content })
		: (content: string) => createPostMutation.mutate({ content });

	return (
		<AppModal isModalVisible={modalVisible} dismissModal={closeModal}>
			<PostForm
				formData={postFormData}
				onSubmit={handleFormSubmit}
				isPending={postFormData.id ? updatePostMutation.isPending : createPostMutation.isPending}
			/>
		</AppModal>
	);
});
