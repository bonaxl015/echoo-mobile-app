import { CommentModal, CommentModalRef } from '@features/comments/components/CommentModal';
import DeleteCommentDialog, {
	ConfirmCommentDeleteDialogRef
} from '@features/comments/components/DeleteCommentDialog';
import { LikesListModal, LikesListModalRef } from '@features/like/components/LikesListModal';
import DeletePostDialog, {
	ConfirmPostDeleteDialogRef
} from '@features/posts/components/DeletePostDialog';
import { PostFormModal, PostFormModalRef } from '@features/posts/components/PostFormModal';
import React, { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

interface PostData {
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmPostDeleteDialogRef | null>;
	commentDeleteRef: RefObject<ConfirmCommentDeleteDialogRef | null>;
	likeListModalRef: RefObject<LikesListModalRef | null>;
	newsfeedCommentListModalRef: RefObject<CommentModalRef | null>;
	profileCommentListModalRef: RefObject<CommentModalRef | null>;
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
	likeListModalRef: {
		current: null
	},
	newsfeedCommentListModalRef: {
		current: null
	},
	profileCommentListModalRef: {
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
	const likeListModalRef = useRef<LikesListModalRef>(null);
	const newsfeedCommentListModalRef = useRef<CommentModalRef>(null);
	const profileCommentListModalRef = useRef<CommentModalRef>(null);

	const value = {
		postFormModalRef,
		postDeleteDialogRef,
		commentDeleteRef,
		likeListModalRef,
		newsfeedCommentListModalRef,
		profileCommentListModalRef
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

			{/* Likes list modal */}
			<LikesListModal ref={likeListModalRef} />

			{/* View comments in newsfeed */}
			<CommentModal ref={newsfeedCommentListModalRef} />

			{/* View comments in user profile */}
			<CommentModal ref={profileCommentListModalRef} />
		</PostDataContext.Provider>
	);
}
