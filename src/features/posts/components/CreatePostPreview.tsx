import AnimatedModal from '@components/AnimatedModal';
import { CreatePostForm } from '@features/posts/components/CreatePostForm';
import { useCreatePost } from '@features/posts/hooks/useCreatePost';
import { useAuthStore } from '@store/useAuthStore';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';

export function CreatePostPreview() {
	const theme = useTheme();
	const user = useAuthStore((s) => s.user);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const closeModal = () => setModalVisible(false);
	const createPostMutation = useCreatePost(closeModal);

	return (
		<Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
			{/* Pressable form in newsfeed */}
			<Pressable onPress={() => setModalVisible(true)} style={styles.row}>
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

			{/* Create Post Modal */}
			<AnimatedModal modalVisible={modalVisible} onDismiss={closeModal}>
				<CreatePostForm
					onSubmit={(content) => createPostMutation.mutate({ content })}
					isPending={createPostMutation.isPending}
				/>
			</AnimatedModal>
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
