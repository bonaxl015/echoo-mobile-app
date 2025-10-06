import { usePostDataContext } from '@provider/PostDataProvider';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

interface IViewCommentLikesButton {
	likesCount: number;
	commentId: string;
}

export function ViewCommentLikesButton({ likesCount, commentId }: IViewCommentLikesButton) {
	const theme = useTheme();
	const { likeListModalRef } = usePostDataContext();

	const handleViewCommentLikes = () => {
		if (commentId) {
			likeListModalRef.current?.updateCommentId(commentId);
			likeListModalRef.current?.openModal();
		}
	};

	if (!likesCount) {
		return null;
	}

	return (
		<TouchableOpacity onPress={handleViewCommentLikes} style={{ flex: 1 }}>
			<View style={styles.viewLikeButton}>
				<Text
					variant="labelMedium"
					style={[styles.likesCount, { color: theme.colors.onSurfaceVariant }]}
				>
					{likesCount}
				</Text>
				<Icon size={18} source="thumb-up" color={theme.colors.primary} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	viewLikeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: 16
	},
	likesCount: {
		marginHorizontal: 12
	}
});
