import { useAuthStore } from '@store/useAuthStore';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';

interface ICommentItem {
	id: string | null;
	content: string;
	authorName: string;
	authorId: string;
	authorProfilePhoto: string;
	likesCount: number;
	createdAt: string;
}

export function CommentItem({
	content,
	authorName,
	authorId,
	authorProfilePhoto,
	likesCount,
	createdAt
}: ICommentItem) {
	const theme = useTheme();
	const currentUser = useAuthStore((s) => s.user);

	return (
		<TouchableWithoutFeedback onPress={() => {}}>
			<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
							<IconButton icon="pencil" size={20} onPress={() => {}} />
							<IconButton icon="delete" size={20} onPress={() => {}} />
						</>
					)}
				</View>

				<View style={styles.body}>
					<Text variant="bodyMedium">{content}</Text>
					<View style={styles.bodyBottom}>
						<Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
							{likesCount}
						</Text>
						<IconButton icon="thumb-up-outline" size={20} onPress={() => {}} />
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
