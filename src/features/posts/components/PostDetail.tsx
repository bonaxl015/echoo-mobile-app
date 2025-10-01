import { ICommentInputRef } from '@features/comments/components/CommentInput';
import { ConfirmDialogRef } from '@features/comments/components/DeleteCommentDialog';
import { useAuthStore } from '@store/useAuthStore';
import React, { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import { useGetPostById } from '../hooks/useGetPostById';
import { PostFormModalRef } from './PostFormModal';

interface IPostDetails {
	id: string;
	authorName: string;
	authorId: string;
	authorProfilePhoto: string;
	likesCount: number;
	content: string;
	createdAt: string;
	commentInputRef: RefObject<ICommentInputRef>;
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmDialogRef | null>;
}

export default function PostDetail({
	id,
	authorName,
	authorId,
	authorProfilePhoto,
	likesCount,
	content,
	createdAt,
	commentInputRef,
	postFormModalRef,
	postDeleteDialogRef
}: IPostDetails) {
	const theme = useTheme();
	const currentUser = useAuthStore((s) => s.user);
	const { data: postData, isFetching } = useGetPostById(id);

	const postInfo = {
		content: isFetching ? content : postData?.post.content,
		likesCount: isFetching ? likesCount : postData?.post.likesCount
	};

	const handleEditPost = () => {
		if (id) {
			postFormModalRef.current?.updatePostFormData({ id, content: postInfo.content ?? '' });
			postFormModalRef.current?.openModal();
		}
	};

	const handleDeletePost = () => {
		if (id) {
			postDeleteDialogRef.current?.updateDeleteData({ id });
			postDeleteDialogRef.current?.openDialog();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => {}}>
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Avatar.Image size={40} source={{ uri: authorProfilePhoto }} />
						<View style={{ marginLeft: 8 }}>
							<Text variant="titleMedium">{authorName}</Text>
							<Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
								{createdAt}
							</Text>
						</View>
					</View>

					{currentUser?.id === authorId && (
						<View style={styles.headerRight}>
							<IconButton icon="pencil" onPress={handleEditPost} />
							<IconButton icon="delete" onPress={handleDeletePost} />
						</View>
					)}
				</View>

				<View style={styles.body}>
					<Text variant="bodyLarge">{postInfo.content}</Text>
					<View style={styles.bodyBottom}>
						<Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
							{postInfo.likesCount} Likes
						</Text>
					</View>
				</View>

				<View style={[styles.footer, { borderColor: theme.colors.onSurfaceVariant }]}>
					<IconButton icon="thumb-up-outline" style={styles.footerButton} onPress={() => {}} />
					<IconButton
						icon="comment-outline"
						style={styles.footerButton}
						onPress={() => commentInputRef.current?.updateIsFocused(true)}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerRight: {
		flexDirection: 'row'
	},
	body: {
		paddingHorizontal: 10
	},
	bodyBottom: {
		marginVertical: 5
	},
	footer: {
		flexDirection: 'row'
	},
	footerButton: {
		flex: 1,
		margin: 0,
		height: 50
	}
});
