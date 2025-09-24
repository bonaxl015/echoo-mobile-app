export type Post = {
	authorName: string;
	authorProfilePhoto: string;
	commentsCount: number;
	likesCount: number;
	isLikedByCurrentUser: boolean;
	content: string;
	id: string | null;
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

export type ICreatePostService = Pick<Post, 'content'>;

export type CreatePostResponse = {
	post: CreatePostData;
};

export type IUpdatePostService = Pick<Post, 'id' | 'content'>;

export type UpdatePostResponse = CreatePostResponse;

export type IDeletePostService = Pick<Post, 'id'>;

export type DeletePostResponse = {
	deleted: boolean;
};
