import apiClient from '@services/apiClient';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_STRING } from '@services/constants';
import dateFormatter from '@utils/dateFormatter';
import { AxiosError } from 'axios';
import { CommentListRequest, CommentListResponse } from './types';
import { COMMENT_API_URL } from './url';

export async function getCommentList({ postId, pageParam }: CommentListRequest) {
	try {
		const params = {
			postId,
			pageNumber: pageParam.toString(),
			pageSize: DEFAULT_PAGE_SIZE_STRING
		};
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<CommentListResponse>(
			`${COMMENT_API_URL.GET_COMMENT_LIST}?${urlStringParams.toString()}`
		);

		const dateFormattedComments = res.data.comments.length
			? res.data.comments.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			comments: dateFormattedComments,
			nextPage:
				res.data.comments.length && res.data.comments.length === DEFAULT_PAGE_SIZE
					? pageParam + 1
					: undefined
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
