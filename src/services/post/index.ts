import apiClient from '@services/apiClient';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_STRING } from '@services/constants';
import dateFormatter from '@utils/dateFormatter';
import { AxiosError } from 'axios';
import {
	CreatePostResponse,
	DeletePostResponse,
	ICreatePostService,
	IDeletePostService,
	IUpdatePostService,
	PostResponse,
	UpdatePostResponse
} from './types';
import { POST_API_URL } from './url';

export async function getPostList({ pageParam = 1 }) {
	try {
		const params = {
			pageNumber: pageParam.toString(),
			pageSize: DEFAULT_PAGE_SIZE_STRING
		};
		const urlStringParams = new URLSearchParams(params);
		const res = await apiClient.get<PostResponse>(
			`${POST_API_URL.GET_POST_LIST}?${urlStringParams.toString()}`
		);

		const dateFormattedPosts = res.data.posts.length
			? res.data.posts.map((item) => ({
					...item,
					createdAt: dateFormatter(item.createdAt),
					updatedAt: dateFormatter(item.updatedAt)
				}))
			: [];

		return {
			posts: dateFormattedPosts,
			nextPage:
				res.data.posts.length && res.data.posts.length === DEFAULT_PAGE_SIZE
					? pageParam + 1
					: undefined
		};
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function createPost(data: ICreatePostService) {
	try {
		const res = await apiClient.post<CreatePostResponse>(POST_API_URL.CREATE_POST, data);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function updatePost(data: IUpdatePostService) {
	try {
		const res = await apiClient.patch<UpdatePostResponse>(POST_API_URL.UPDATE_POST, data);

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}

export async function deletePost(data: IDeletePostService) {
	try {
		const res = await apiClient.delete<DeletePostResponse>(POST_API_URL.DELETE_POST, { data });

		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
	}
}
