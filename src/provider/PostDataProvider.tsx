import { CommentListModalRef } from '@features/comments/components/CommentListModal';
import DeleteCommentDialog, {
	ConfirmCommentDeleteDialogRef
} from '@features/comments/components/DeleteCommentDialog';
import DeletePostDialog, {
	ConfirmPostDeleteDialogRef
} from '@features/posts/components/DeletePostDialog';
import { PostFormModal, PostFormModalRef } from '@features/posts/components/PostFormModal';
import React, { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

interface PostData {
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmPostDeleteDialogRef | null>;
	commentDeleteRef: RefObject<ConfirmCommentDeleteDialogRef | null>;
	commentListModalRef: RefObject<CommentListModalRef | null>;
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
	},
	commentDeleteRef: {
		current: null
	},
	commentListModalRef: {
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
	const postDeleteDialogRef = useRef<ConfirmPostDeleteDialogRef>(null);
	const commentDeleteRef = useRef<ConfirmCommentDeleteDialogRef>(null);
	const commentListModalRef = useRef<CommentListModalRef>(null);

	const value = {
		postFormModalRef,
		postDeleteDialogRef,
		commentDeleteRef,
		commentListModalRef
	};

	return (
		<PostDataContext.Provider value={value}>
			{children}

			{/* Create or edit posts */}
			<PostFormModal ref={postFormModalRef} />

			{/* Delete post dialog */}
			<DeletePostDialog ref={postDeleteDialogRef} />

			{/* Delete comment dialog */}
			<DeleteCommentDialog ref={commentDeleteRef} />
		</PostDataContext.Provider>
	);
}
