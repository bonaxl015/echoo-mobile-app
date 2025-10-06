import { usePostDataContext } from '@provider/PostDataProvider';
import { useAuthStore } from '@store/useAuthStore';
import React, { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import { ICommentInputRef } from './CommentInput';
import { CommentLikeButton } from './CommentLikeButton';

interface ICommentItem {
	id: string | null;
	postId: string;
	content: string;
	authorName: string;
	authorId: string;
	authorProfilePhoto: string;
	isLikedByCurrentUser: boolean;
	likesCount: number;
	createdAt: string;
	commentInputRef: RefObject<ICommentInputRef | null>;
}

export function CommentItem({
	id,
	postId,
	content,
	authorName,
	authorId,
	authorProfilePhoto,
	isLikedByCurrentUser,
	likesCount,
	createdAt,
	commentInputRef
}: ICommentItem) {
	const theme = useTheme();
	const currentUser = useAuthStore((s) => s.user);
	const { commentDeleteRef } = usePostDataContext();

	const handleEdit = () => {
		if (id) {
			commentInputRef.current?.updateIsFocused(true);
			commentInputRef.current?.updateContent(content);
			commentInputRef.current?.updateCommentId(id);
		}
	};

	const handleDelete = () => {
		if (id) {
			commentDeleteRef.current?.updateDeleteData({ commentId: id, postId });
			commentDeleteRef.current?.openDialog();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => {}}>
			<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
				<View style={styles.header}>
					<Avatar.Image size={36} source={{ uri: authorProfilePhoto }} />
					<View style={{ marginLeft: 8, flex: 1 }}>
						<Text variant="titleSmall">{authorName}</Text>
						<Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
							{createdAt}
						</Text>
					</View>

					{currentUser?.id === authorId && (
						<>
							<IconButton icon="pencil" size={20} onPress={handleEdit} />
							<IconButton icon="delete" size={20} onPress={handleDelete} />
						</>
					)}
				</View>

				<View style={styles.body}>
					<Text variant="bodyMedium">{content}</Text>
					<View style={styles.bodyBottom}>
						<Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
							{likesCount}
						</Text>
						<CommentLikeButton
							isLikedByCurrentUser={isLikedByCurrentUser}
							commentId={id as string}
							postId={postId}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		padding: 10
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	body: {
		marginLeft: 44
	},
	bodyBottom: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5
	}
});
