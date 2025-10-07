import { ICommentInputRef } from '@features/comments/components/CommentInput';
import { useAuthStore } from '@store/useAuthStore';
import React, { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useGetPostById } from '../hooks/useGetPostById';
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';
import { LikePostSingleButton } from './LikePostSingleButton';
import { UserHeadingData } from './UserHeadingData';
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
					<UserHeadingData
						type="post"
						authorId={authorId}
						authorName={authorName}
						authorProfilePhoto={authorProfilePhoto}
						createdAt={createdAt}
					/>

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
		alignItems: 'center',
		padding: 10
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
