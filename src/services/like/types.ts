export type LikeObject = {
	userName: string;
	userProfilePhoto: string;
	userId: string;
	postId?: string;
	commentId?: string;
	id: string;
	createdAt: string;
	updatedAt: string;
};

type Like = {
	like: boolean;
};

type Unlike = {
	unlike: boolean;
};

export type PostLikeListRequest = {
	postId: string;
	pageParam?: number;
};

export type PostLikeListResponse = {
	likes: LikeObject[];
};

export type PostLikeRequest = {
	postId: string;
};

export type CommentLikeListRequest = {
	commentId: string;
	pageParam?: number;
};

export type CommentLikeListResponse = {
	likes: LikeObject[];
};

export type PostLikeResponse = Like;

export type PostUnlikeRequest = PostLikeRequest;

export type PostUnlikeResponse = Unlike;

export type CommentLikeRequest = {
	commentId: string;
	postId: string;
};

export type CommentLikeResponse = Like;

export type CommentUnlikeRequest = CommentLikeRequest;

export type CommentUnlikeResponse = Unlike;
