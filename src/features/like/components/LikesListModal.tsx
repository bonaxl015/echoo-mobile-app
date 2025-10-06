import { AppModal } from '@components/AppModal';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { QUERY_TYPE } from '../hooks/useGetLikeList';
import { LikesList } from './LikesList';

export interface LikesListModalRef {
	openModal: () => void;
	closeModal: () => void;
	updatePostId: (value: string) => void;
	updateCommentId: (value: string) => void;
}

export const LikesListModal = forwardRef<LikesListModalRef>((_props, ref) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [postId, setPostId] = useState<string>('');
	const [commentId, setCommentId] = useState<string>('');

	const openModal = () => setModalVisible(true);
	const closeModal = () => {
		setModalVisible(false);
		setPostId('');
		setCommentId('');
	};
	const updatePostId = (value: string) => setPostId(value);
	const updateCommentId = (value: string) => setCommentId(value);

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
		updatePostId,
		updateCommentId
	}));

	const renderContent = (() => {
		if (postId) {
			return <LikesList id={postId} type={QUERY_TYPE.POST} />;
		}

		if (commentId) {
			return <LikesList id={commentId} type={QUERY_TYPE.COMMENT} />;
		}

		return null;
	})();

	return (
		<AppModal isModalVisible={modalVisible} dismissModal={closeModal}>
			{renderContent}
		</AppModal>
	);
});
