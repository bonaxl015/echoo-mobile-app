import { Post, PostByUserResponse, PostResponse } from '@services/post/types';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { InfiniteData, QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import React, { ReactElement } from 'react';
import PostListFooter from './PostListFooter';

interface IPostList {
	posts: Post[];
	renderItem: ListRenderItem<Post>;
	onEndReached: () => void;
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	ListHeaderComponent?: ReactElement;
	refetch: (
		options?: RefetchOptions
	) => Promise<
		QueryObserverResult<
			InfiniteData<
				| (PostResponse & { nextPage?: number })
				| (PostByUserResponse & { nextPage?: number })
				| undefined,
				unknown
			>,
			Error
		>
	>;
}

export function PostList({
	posts,
	renderItem,
	onEndReached,
	isFetchingNextPage,
	hasNextPage,
	refetch,
	ListHeaderComponent
}: IPostList) {
	return (
		<FlashList<Post>
			data={posts}
			keyExtractor={(item, index) => item?.id ?? `post-${index}`}
			renderItem={renderItem}
			contentContainerStyle={{ paddingBottom: 24 }}
			scrollEnabled
			keyboardShouldPersistTaps="handled"
			keyboardDismissMode="on-drag"
			removeClippedSubviews
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			onRefresh={() => refetch()}
			ListHeaderComponent={ListHeaderComponent}
			ListFooterComponent={
				<PostListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
			}
		/>
	);
}
