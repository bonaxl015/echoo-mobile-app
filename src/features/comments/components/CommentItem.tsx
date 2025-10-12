import { NORMALIZED_PATHS } from '@constants/route';
import { UserHeadingData } from '@features/posts/components/UserHeadingData';
import { usePostDataContext } from '@provider/PostDataProvider';
import { useAuthStore } from '@store/useAuthStore';
import { usePathname } from 'expo-router';
import React, { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { ICommentInputRef } from './CommentInput';
import { CommentLikeButton } from './CommentLikeButton';
import { ViewCommentLikesButton } from './ViewCommentLikesButton';

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
	commentInputRef?: RefObject<ICommentInputRef | null>;
	displayMode: 'modal' | 'details';
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
	commentInputRef,
	displayMode
}: ICommentItem) {
	const theme = useTheme();
	const pathname = usePathname();
	const currentUser = useAuthStore((s) => s.user);
	const { commentDeleteRef, newsfeedCommentListModalRef, profileCommentListModalRef } =
		usePostDataContext();

	const handleEdit = () => {
		if (!id) return;

		if (displayMode === 'details' && commentInputRef) {
			commentInputRef.current?.updateContent(content);
			commentInputRef.current?.updateCommentId(id);
			commentInputRef.current?.updateIsFocused(true);
		}

		if (displayMode === 'modal') {
			const currentRef =
				pathname === NORMALIZED_PATHS.NEWSFEED
					? newsfeedCommentListModalRef
					: profileCommentListModalRef;

			currentRef.current?.updateCommentInputFocused();
			currentRef.current?.updateCommentContent(content);
			currentRef.current?.updateCommentId(id);
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
					<UserHeadingData
						type="comment"
						authorId={authorId}
						authorName={authorName}
						authorProfilePhoto={authorProfilePhoto}
						createdAt={createdAt}
					/>
					{currentUser?.id === authorId && (
						<View style={styles.headerRight}>
							<IconButton icon="pencil" size={20} onPress={handleEdit} />
							<IconButton icon="delete" size={20} onPress={handleDelete} />
						</View>
					)}
				</View>

				<View style={styles.body}>
					<Text variant="bodyMedium">{content}</Text>
					<View style={styles.bodyBottom}>
						<CommentLikeButton
							isLikedByCurrentUser={isLikedByCurrentUser}
							commentId={id as string}
							postId={postId}
						/>
						<ViewCommentLikesButton commentId={id as string} likesCount={likesCount} />
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
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerRight: {
		flexDirection: 'row'
	},
	body: {
		marginLeft: 44
	},
	bodyBottom: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8
	}
});
