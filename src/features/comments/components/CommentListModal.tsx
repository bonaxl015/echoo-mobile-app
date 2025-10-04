import { AppModal } from '@components/AppModal';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CommentListContent } from './CommentListContent';

export interface CommentListModalRef {
	openModal: () => void;
	closeModal: () => void;
	updatePostId: (value: string) => void;
}

export const CommentListModal = forwardRef<CommentListModalRef>((_props, ref) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [postId, setPostId] = useState<string>('');

	const openModal = () => setModalVisible(true);
	const closeModal = () => setModalVisible(false);
	const updatePostId = (value: string) => setPostId(value);

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
		updatePostId
	}));

	return (
		<AppModal isModalVisible={modalVisible} dismissModal={closeModal}>
			<CommentListContent postId={postId} />
		</AppModal>
	);
});
