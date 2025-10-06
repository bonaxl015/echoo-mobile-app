import { usePostDataContext } from '@provider/PostDataProvider';
import { useAuthStore } from '@store/useAuthStore';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';
import { LikePostListButton } from './LikePostListButton';

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
	const { commentListModalRef, likeListModalRef } = usePostDataContext();

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
			pathname: '/(authenticated)/(full-screen)/view-post',
			params: {
				post: JSON.stringify(postData)
			}
		});
	};

	const handleOpenCommentModal = () => {
		if (id) {
			commentListModalRef.current?.updatePostId(id);
			commentListModalRef.current?.openModal();
		}
	};

	const handleViewLikes = () => {
		if (id) {
			likeListModalRef.current?.updatePostId(id);
			likeListModalRef.current?.openModal();
		}
	};

	return (
		<Pressable onPress={handleViewPost}>
			<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
				{/* Header */}
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
							{Boolean(likesCount) && (
								<TouchableOpacity onPress={handleViewLikes}>
									<Text
										variant="labelLarge"
										style={{ color: theme.colors.onSurfaceVariant, textAlign: 'left' }}
									>
										{likesCount} {Number(likesCount) > 1 ? 'Likes' : 'Like'}
									</Text>
								</TouchableOpacity>
							)}
						</View>
						<View style={{ flex: 1 }}>
							{Boolean(commentsCount) && (
								<TouchableOpacity onPress={handleOpenCommentModal}>
									<Text
										variant="labelLarge"
										style={{
											color: theme.colors.onSurfaceVariant,
											textAlign: 'right'
										}}
									>
										{commentsCount} {Number(commentsCount) > 1 ? 'Comments' : 'Comment'}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>

				{/* Footer */}
				<View style={[styles.footer, { borderColor: theme.colors.onSurfaceVariant }]}>
					<LikePostListButton
						postId={id as string}
						isLikedByCurrentUser={isLikedByCurrentUser as boolean}
					/>
					<IconButton
						icon="comment-outline"
						style={styles.footerButton}
						onPress={handleOpenCommentModal}
					/>
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
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
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
	},
	footerButton: {
		flex: 1,
		margin: 0,
		height: 50
	}
});
