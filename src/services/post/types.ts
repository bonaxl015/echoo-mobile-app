export type Post = {
	authorName: string;
	authorProfilePhoto: string;
	commentsCount: number;
	likesCount: number;
	isLikedByCurrentUser: boolean;
	content: string;
	id: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
};

export type CreatePostData = {
	content: string;
	id: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
};

export interface PostResponse {
	posts: Post[];
}

export type ICreatePostService = {
	content: string;
};

export type CreatePostResponse = {
	post: CreatePostData;
};
