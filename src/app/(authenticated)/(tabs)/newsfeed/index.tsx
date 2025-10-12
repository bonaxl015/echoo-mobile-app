import { CreatePostPreview } from '@features/posts/components/CreatePostPreview';
import { PostList } from '@features/posts/components/PostList';
import { useGetPostList } from '@features/posts/hooks/useGetPostList';
import usePostListProps from '@features/posts/hooks/usePostListProps';
import { Post } from '@services/post/types';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsfeedScreen() {
	const theme = useTheme();
	const { data, isFetching, refetch, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useGetPostList();
	const { renderItem, onEndReached } = usePostListProps({
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
			<PostList
				posts={posts}
				renderItem={renderItem}
				onEndReached={onEndReached}
				refetch={refetch}
				isFetching={isFetching}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		);
	})();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
			edges={['bottom']}
		>
			<CreatePostPreview />
			{renderPostList}
		</SafeAreaView>
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
