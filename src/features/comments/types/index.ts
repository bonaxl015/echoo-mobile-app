export type InfiniteComments = {
	pages: {
		comments: Comment[];
		nextPage?: number;
	}[];
	pageParams: unknown[];
};
