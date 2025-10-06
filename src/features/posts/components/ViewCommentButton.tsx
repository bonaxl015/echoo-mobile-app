import { usePostDataContext } from '@provider/PostDataProvider';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export const COMMENT_BUTTON = {
	COUNT_TEXT: 'COUNT_TEXT',
	ICON: 'ICON'
} as const;

interface IViewCommentButton {
	mode: keyof typeof COMMENT_BUTTON;
	postId?: string | null;
	commentsCount?: number;
}

export function ViewCommentButton({ mode, postId, commentsCount }: IViewCommentButton) {
	const theme = useTheme();
	const { commentListModalRef } = usePostDataContext();

	const handleOpenCommentModal = () => {
		if (postId) {
			commentListModalRef.current?.updatePostId(postId);
			commentListModalRef.current?.openModal();
		}
	};

	if (mode === COMMENT_BUTTON.ICON) {
		return (
			<IconButton
				icon="comment-outline"
				style={styles.footerButton}
				onPress={handleOpenCommentModal}
			/>
		);
	}

	if (mode === COMMENT_BUTTON.COUNT_TEXT && !commentsCount) {
		return null;
	}

	return (
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
	);
}

const styles = StyleSheet.create({
	footerButton: {
		flex: 1,
		margin: 0,
		height: 50
	}
});
