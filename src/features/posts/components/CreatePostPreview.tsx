import { useAuthStore } from '@store/useAuthStore';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';
import { PostFormData } from './PostFormModal';

interface ICreatePostPreview {
	openModal: () => void;
	updatePostFormData: (value: PostFormData) => void;
}

export function CreatePostPreview({ openModal, updatePostFormData }: ICreatePostPreview) {
	const theme = useTheme();
	const user = useAuthStore((s) => s.user);

	const handleCreatePost = () => {
		updatePostFormData({
			id: null,
			content: ''
		});
		openModal();
	};

	return (
		<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
			{/* Pressable form in newsfeed */}
			<Pressable onPress={handleCreatePost} style={styles.row}>
				<Avatar.Image size={40} source={{ uri: user?.profilePhoto }} />
				<Text
					style={[
						styles.placeholder,
						{
							color: theme.colors.onSurfaceVariant,
							borderColor: theme.colors.onSurfaceVariant
						}
					]}
				>
					Share your thoughts, {user?.name}
				</Text>
			</Pressable>
		</Surface>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 10,
		elevation: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	placeholder: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginLeft: 16,
		borderWidth: 1,
		borderRadius: 20
	}
});
