import DeletePostDialog, { ConfirmDialogRef } from '@features/posts/components/DeletePostDialog';
import { PostFormModal, PostFormModalRef } from '@features/posts/components/PostFormModal';
import React, { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

interface PostData {
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmDialogRef | null>;
}

interface IPostDataProvider {
	children: ReactNode;
}

const initialPostData: PostData = {
	postFormModalRef: {
		current: null
	},
	postDeleteDialogRef: {
		current: null
	}
};

const PostDataContext = createContext<PostData>(initialPostData);

export function usePostDataContext() {
	const context = useContext(PostDataContext);

	if (!context) {
		throw new Error('usePostDataContext must be used within PostDataProvider');
	}

	return context;
}

export function PostDataProvider({ children }: IPostDataProvider) {
	const postFormModalRef = useRef<PostFormModalRef>(null);
	const postDeleteDialogRef = useRef<ConfirmDialogRef>(null);

	const value = {
		postFormModalRef,
		postDeleteDialogRef
	};

	return (
		<PostDataContext.Provider value={value}>
			{children}

			{/* Create or edit posts */}
			<PostFormModal ref={postFormModalRef} />

			{/* Delete post dialog */}
			<DeletePostDialog ref={postDeleteDialogRef} />
		</PostDataContext.Provider>
	);
}
