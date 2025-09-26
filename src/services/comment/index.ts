import apiClient from '@services/apiClient';
import dateFormatter from '@utils/dateFormatter';
import { AxiosError } from 'axios';
import { CommentListRequest, CommentListResponse } from './types';
import { COMMENT_API_URL } from './url';

export async function getCommentList({ postId, pageParam }: CommentListRequest) {
	try {
		const params = {
			postId,
			pageNumber: pageParam.toString(),
			pageSize: '20'
		};
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<CommentListResponse>(
			`${COMMENT_API_URL.GET_COMMENT_LIST}?${urlStringParams.toString()}`
		);

		const dateFormattedPosts = res.data.comments.length
			? res.data.comments.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			posts: dateFormattedPosts,
			nextPage: res.data.comments.length ? pageParam + 1 : undefined
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
