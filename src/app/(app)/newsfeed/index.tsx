import { CreatePostPreview } from '@features/posts/components/CreatePostPreview';
import { PostCard } from '@features/posts/components/PostCard';
import PostFormModal, { PostFormModalRef } from '@features/posts/components/PostFormModal';
import { useGetPostList } from '@features/posts/hooks/useGetPostList';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsfeedScreen() {
	const theme = useTheme();
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetPostList();
	const postFormModalRef = useRef<PostFormModalRef>({
		openModal: () => {},
		closeModal: () => {},
		updatePostFormData: () => {}
	});

	const posts = data?.pages.flatMap((page) => page?.posts) || [];

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
			<SafeAreaView
				style={[styles.container, { backgroundColor: theme.colors.background }]}
				edges={['bottom']}
			>
				<FlatList
					data={posts}
					keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
					renderItem={({ item }) => (
						<PostCard
							{...item}
							openModal={postFormModalRef.current.openModal}
							updatePostFormData={postFormModalRef.current.updatePostFormData}
						/>
					)}
					contentContainerStyle={{ paddingBottom: 24 }}
					scrollEnabled
					keyboardShouldPersistTaps="handled"
					ListHeaderComponent={
						<CreatePostPreview
							openModal={postFormModalRef.current.openModal}
							updatePostFormData={postFormModalRef.current.updatePostFormData}
						/>
					}
					onEndReached={() => {
						if (hasNextPage) {
							fetchNextPage();
						}
					}}
					onEndReachedThreshold={0.5}
					ListFooterComponent={() => (
						<View style={{ alignItems: 'center' }}>
							{isFetchingNextPage ? (
								<ActivityIndicator size="small" color={theme.colors.primary} />
							) : hasNextPage ? null : (
								<Text style={{ color: theme.colors.onSurfaceVariant }}>
									You have read all of the posts
								</Text>
							)}
						</View>
					)}
				/>
			</SafeAreaView>

			{/* Create or edit posts */}
			<PostFormModal ref={postFormModalRef} />
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
