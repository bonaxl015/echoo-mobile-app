import {
	CommentListModal,
	CommentListModalRef
} from '@features/comments/components/CommentListModal';
import { CreatePostPreview } from '@features/posts/components/CreatePostPreview';
import PostListFooter from '@features/posts/components/PostListFooter';
import { useGetPostList } from '@features/posts/hooks/useGetPostList';
import usePostListProps from '@features/posts/hooks/usePostListProps';
import { Post } from '@services/post/types';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsfeedScreen() {
	const theme = useTheme();
	const { data, isFetching, refetch, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetPostList();
	const commentListModalRef = useRef<CommentListModalRef>(null);
	const { renderItem, onEndReached } = usePostListProps({
		commentListModalRef,
		fetchNextPage,
		hasNextPage
	});

	const posts = (data?.pages.flatMap((page) => page?.posts) as Post[]) ?? [];

	const renderPostList = (() => {
		if (isLoading) {
			return (
				<SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
					<View style={styles.center}>
						<ActivityIndicator size="large" color={theme.colors.primary} />
					</View>
				</SafeAreaView>
			);
		}

		if (!posts.length) {
			return (
				<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
					<View style={styles.center}>
						<Text style={{ color: theme.colors.onSurfaceVariant }}>No posts to display</Text>
					</View>
				</View>
			);
		}

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
				ListFooterComponent={
					<PostListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
				}
			/>
		);
	})();

	return (
		<>
			{/* Post list display */}
			<SafeAreaView
				style={[styles.container, { backgroundColor: theme.colors.background }]}
				edges={['bottom']}
			>
				<CreatePostPreview />
				{renderPostList}
			</SafeAreaView>

			{/* Comment list modal */}
			<CommentListModal ref={commentListModalRef} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
