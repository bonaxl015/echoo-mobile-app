import { Post } from '@services/post/types';

export interface InfinitePosts {
	pages: {
		posts: Post[];
		nextPage?: number;
	}[];
	pageParams: unknown[];
}
