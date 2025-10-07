import { Post, PostByUserResponse, PostResponse } from '@services/post/types';
import { InfiniteData, QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import React, { ReactElement } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import PostListFooter from './PostListFooter';

interface IPostList {
	posts: Post[];
	renderItem: ListRenderItem<Post>;
	onEndReached: () => void;
	isFetching: boolean;
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
	isFetching,
	isFetchingNextPage,
	hasNextPage,
	refetch,
	ListHeaderComponent
}: IPostList) {
	return (
		<FlatList<Post>
			data={posts}
			keyExtractor={(item, index) => item?.id ?? `post-${index}`}
			renderItem={renderItem}
			contentContainerStyle={{ paddingBottom: 24 }}
			scrollEnabled
			keyboardShouldPersistTaps="handled"
			keyboardDismissMode="on-drag"
			initialNumToRender={5}
			maxToRenderPerBatch={10}
			windowSize={5}
			removeClippedSubviews
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			refreshing={isFetching}
			onRefresh={() => refetch()}
			ListHeaderComponent={ListHeaderComponent}
			ListFooterComponent={
				<PostListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
			}
		/>
	);
}
