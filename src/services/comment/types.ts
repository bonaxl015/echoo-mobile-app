export type Comment = {
	authorName: string;
	authorProfilePhoto: string;
	likesCount: number;
	isLikedByCurrentUser: boolean;
	content: string;
	id: string | null;
	authorId: string;
	postId: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateCommentData = {
	content: string;
	id: string;
	postId: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
};

export type CommentListRequest = {
	postId: string;
	pageParam: number;
};

export type CommentListResponse = {
	comments: Comment[];
};

export type CommentCreateParams = {
	postId: string;
	content: string;
};

export type CreateCommentResponse = {
	comment: CreateCommentData;
};

export type CommentUpdateParams = {
	id: string;
	postId: string;
	content: string;
};

export type UpdateCommentResponse = {
	comment: CreateCommentData;
};

export type CommentDeleteParams = {
	id: string;
	postId: string;
};

export type DeleteCommentResponse = {
	deleted: boolean;
};
