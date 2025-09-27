import { CreatePostPreview } from '@features/posts/components/CreatePostPreview';
import DeletePostDialog, { ConfirmDialogRef } from '@features/posts/components/DeletePostDialog';
import PostFormModal, { PostFormModalRef } from '@features/posts/components/PostFormModal';
import PostListFooter from '@features/posts/components/PostListFooter';
import { useGetPostList } from '@features/posts/hooks/useGetPostList';
import usePostListProps from '@features/posts/hooks/usePostListProps';
import { Post } from '@services/post/types';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsfeedScreen() {
	const theme = useTheme();
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetPostList();
	const postFormModalRef = useRef<PostFormModalRef>(null);
	const postDeleteDialogRef = useRef<ConfirmDialogRef>(null);
	const { renderItem, onEndReached } = usePostListProps({
		postFormModalRef,
		postDeleteDialogRef,
		fetchNextPage,
		hasNextPage
	});

	const posts = (data?.pages.flatMap((page) => page?.posts) as Post[]) ?? [];

	if (isLoading) {
		return (
			<SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<View style={styles.center}>
					<ActivityIndicator size="large" color={theme.colors.primary} />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<>
			{/* Post list display */}
			<SafeAreaView
				style={[styles.container, { backgroundColor: theme.colors.background }]}
				edges={['bottom']}
			>
				<FlatList<Post>
					data={posts}
					keyExtractor={(item, index) => item.id ?? `post-${index}`}
					renderItem={renderItem}
					contentContainerStyle={{ paddingBottom: 24 }}
					scrollEnabled
					keyboardShouldPersistTaps="handled"
					initialNumToRender={5}
					maxToRenderPerBatch={10}
					windowSize={5}
					removeClippedSubviews
					onEndReached={onEndReached}
					onEndReachedThreshold={0.5}
					ListHeaderComponent={<CreatePostPreview postFormModalRef={postFormModalRef} />}
					ListFooterComponent={
						<PostListFooter isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
					}
				/>
			</SafeAreaView>

			{/* Create or edit posts */}
			<PostFormModal ref={postFormModalRef} />

			{/* Confirm delete dialog */}
			<DeletePostDialog ref={postDeleteDialogRef} />
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
