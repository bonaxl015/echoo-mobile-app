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

export type CommentListRequest = {
	postId: string;
	pageParam: number;
};

export type CommentListResponse = {
	comments: Comment[];
};
