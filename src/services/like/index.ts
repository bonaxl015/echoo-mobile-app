import apiClient from '@services/apiClient';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_STRING } from '@services/constants';
import dateFormatter from '@utils/dateFormatter';
import { AxiosError } from 'axios';
import {
	CommentLikeListRequest,
	CommentLikeListResponse,
	CommentLikeRequest,
	CommentLikeResponse,
	CommentUnlikeRequest,
	CommentUnlikeResponse,
	PostLikeListRequest,
	PostLikeListResponse,
	PostLikeRequest,
	PostLikeResponse,
	PostUnlikeRequest,
	PostUnlikeResponse
} from './types';
import { LIKE_API_URL } from './url';

export async function getPostLikeList({ postId, pageParam = 1 }: PostLikeListRequest) {
	try {
		const params = {
			postId,
			pageNumber: pageParam.toString(),
			pageSize: DEFAULT_PAGE_SIZE_STRING
		};
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<PostLikeListResponse>(
			`${LIKE_API_URL.GET_POST_LIKES}?${urlStringParams.toString()}`
		);

		const dateFormattedLikes = res.data.likes.length
			? res.data.likes.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			likes: dateFormattedLikes,
			nextPage:
				res.data.likes.length && res.data.likes.length === DEFAULT_PAGE_SIZE
					? pageParam + 1
					: undefined
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function getCommentLikeList({ commentId, pageParam = 1 }: CommentLikeListRequest) {
	try {
		const params = {
			commentId,
			pageNumber: pageParam.toString(),
			pageSize: DEFAULT_PAGE_SIZE_STRING
		};
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<CommentLikeListResponse>(
			`${LIKE_API_URL.GET_COMMENT_LIKES}?${urlStringParams.toString()}`
		);

		const dateFormattedLikes = res.data.likes.length
			? res.data.likes.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			likes: dateFormattedLikes,
			nextPage:
				res.data.likes.length && res.data.likes.length === DEFAULT_PAGE_SIZE
					? pageParam + 1
					: undefined
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function likePost(data: PostLikeRequest) {
	try {
		const res = await apiClient.post<PostLikeResponse>(LIKE_API_URL.LIKE_POST, data);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function unlikePost(data: PostUnlikeRequest) {
	try {
		const res = await apiClient.delete<PostUnlikeResponse>(LIKE_API_URL.LIKE_POST, { data });

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function likeComment(data: CommentLikeRequest) {
	try {
		const res = await apiClient.post<CommentLikeResponse>(LIKE_API_URL.LIKE_COMMENT, data);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function unlikeComment(data: CommentUnlikeRequest) {
	try {
		const res = await apiClient.delete<CommentUnlikeResponse>(LIKE_API_URL.LIKE_COMMENT, { data });

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
