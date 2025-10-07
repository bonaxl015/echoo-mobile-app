import { PATHS } from '@constants/route';
import { useAuthStore } from '@store/useAuthStore';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';
import { LikePostListButton } from './LikePostListButton';
import { UserHeadingData } from './UserHeadingData';
import { COMMENT_BUTTON, ViewCommentButton } from './ViewCommentButton';
import { ViewPostLikesButton } from './ViewPostLikesButton';

interface IPostProps {
	authorName?: string;
	authorProfilePhoto?: string;
	commentsCount?: number;
	likesCount?: number;
	isLikedByCurrentUser?: boolean;
	content?: string;
	id?: string | null;
	authorId?: string;
	createdAt?: string;
}

export function PostCard({
	id,
	authorId,
	authorName,
	authorProfilePhoto,
	createdAt,
	commentsCount,
	likesCount,
	content,
	isLikedByCurrentUser
}: IPostProps) {
	const theme = useTheme();
	const currentUser = useAuthStore((s) => s.user);

	const handleViewPost = () => {
		const postData = {
			id,
			authorId,
			authorName,
			authorProfilePhoto,
			isLikedByCurrentUser,
			createdAt,
			likesCount,
			content
		};
		router.push({
			pathname: PATHS.VIEW_POST,
			params: {
				post: JSON.stringify(postData)
			}
		});
	};

	return (
		<Pressable onPress={handleViewPost}>
			<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
				{/* Header */}
				<View style={styles.header}>
					<UserHeadingData
						type="post"
						authorId={authorId}
						authorName={authorName}
						authorProfilePhoto={authorProfilePhoto}
						createdAt={createdAt}
					/>
					<View style={styles.headerRight}>
						{currentUser?.id === authorId && (
							<>
								<EditPostButton postId={id as string} content={content as string} />
								<DeletePostButton postId={id as string} />
							</>
						)}
					</View>
				</View>

				{/* Body */}
				<View style={styles.body}>
					<Text variant="bodyLarge">{content}</Text>
					<View style={styles.bodyBottom}>
						<View style={{ flex: 1 }}>
							<ViewPostLikesButton postId={id} likesCount={likesCount} />
						</View>
						<View style={{ flex: 1 }}>
							<ViewCommentButton
								postId={id}
								mode={COMMENT_BUTTON.COUNT_TEXT}
								commentsCount={commentsCount}
							/>
						</View>
					</View>
				</View>

				{/* Footer */}
				<View style={[styles.footer, { borderColor: theme.colors.onSurfaceVariant }]}>
					<LikePostListButton
						postId={id as string}
						isLikedByCurrentUser={isLikedByCurrentUser as boolean}
					/>
					<ViewCommentButton postId={id} mode={COMMENT_BUTTON.ICON} />
				</View>
			</Surface>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		marginVertical: 5
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	headerRight: {
		flexDirection: 'row'
	},
	body: {
		paddingHorizontal: 12
	},
	bodyBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8
	},
	footer: {
		flexDirection: 'row'
	}
});
