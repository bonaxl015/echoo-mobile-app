import apiClient from '@services/apiClient';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_STRING } from '@services/constants';
import dateFormatter from '@utils/dateFormatter';
import {
	CommentCreateParams,
	CommentDeleteParams,
	CommentListRequest,
	CommentListResponse,
	CommentUpdateParams,
	CreateCommentResponse,
	DeleteCommentResponse,
	UpdateCommentResponse
} from './types';
import { COMMENT_API_URL } from './url';

export async function getCommentList({ postId, pageParam }: CommentListRequest) {
	if (!postId) return;

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
			? res?.data.comments.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			comments: dateFormattedComments,
			nextPage: res?.data.comments.length === DEFAULT_PAGE_SIZE ? pageParam + 1 : undefined
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function createComment(data: CommentCreateParams) {
	try {
		const res = await apiClient.post<CreateCommentResponse>(COMMENT_API_URL.CREATE_COMMENT, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function updateComment(data: CommentUpdateParams) {
	try {
		const res = await apiClient.patch<UpdateCommentResponse>(COMMENT_API_URL.UPDATE_COMMENT, data);

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}

export async function deleteComment(data: CommentDeleteParams) {
	try {
		const res = await apiClient.delete<DeleteCommentResponse>(COMMENT_API_URL.DELETE_COMMENT, {
			data
		});

		return res?.data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
