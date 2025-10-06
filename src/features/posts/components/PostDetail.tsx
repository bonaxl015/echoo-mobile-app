import { ICommentInputRef } from '@features/comments/components/CommentInput';
import { useAuthStore } from '@store/useAuthStore';
import React, { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import { useGetPostById } from '../hooks/useGetPostById';
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';
import { LikePostSingleButton } from './LikePostSingleButton';
import { ViewPostLikesButton } from './ViewPostLikesButton';

interface IPostDetails {
	id: string;
	authorName: string;
	authorId: string;
	authorProfilePhoto: string;
	isLikedByCurrentUser: boolean;
	likesCount: number;
	content: string;
	createdAt: string;
	commentInputRef: RefObject<ICommentInputRef>;
}

export default function PostDetail({
	id,
	authorName,
	authorId,
	authorProfilePhoto,
	isLikedByCurrentUser,
	likesCount,
	content,
	createdAt,
	commentInputRef
}: IPostDetails) {
	const theme = useTheme();
	const currentUser = useAuthStore((s) => s.user);
	const { data: postData, isFetching } = useGetPostById(id);

	const postInfo = {
		content: isFetching ? content : postData?.post.content,
		likesCount: isFetching ? likesCount : postData?.post.likesCount,
		isLikedByCurrentUser: isFetching ? isLikedByCurrentUser : postData?.post.isLikedByCurrentUser
	};

	return (
		<TouchableWithoutFeedback onPress={() => {}}>
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
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
							<EditPostButton postId={id as string} content={content as string} />
							<DeletePostButton postId={id as string} />
						</View>
					)}
				</View>

				<View style={styles.body}>
					<Text variant="bodyLarge">{postInfo.content}</Text>
					<View style={styles.bodyBottom}>
						<ViewPostLikesButton postId={id} likesCount={postInfo.likesCount} />
					</View>
				</View>

				<View style={[styles.footer, { borderColor: theme.colors.onSurfaceVariant }]}>
					<LikePostSingleButton
						postId={id}
						isLikedByCurrentUser={postInfo.isLikedByCurrentUser as boolean}
					/>
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
		marginBottom: 10
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
		marginVertical: 8
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
