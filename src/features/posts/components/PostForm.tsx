import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useAuthStore } from '@store/useAuthStore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { PostFormData } from './PostFormModal';

interface ICreatePostForm {
	formData: PostFormData;
	onSubmit: (content: string) => void;
	isPending: boolean;
}

export function PostForm({ formData, onSubmit, isPending }: ICreatePostForm) {
	const theme = useTheme();
	const user = useAuthStore((s) => s.user);
	const [content, setContent] = useState<string>('');

	const isEditMode = Boolean(formData.id);

	useEffect(() => {
		setContent(isEditMode ? formData.content : '');
	}, [formData, isEditMode]);

	return (
		<BottomSheetView style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<Text variant="headlineMedium">{isEditMode ? 'Update Post' : 'Create Post'}</Text>
			<View style={styles.header}>
				<Avatar.Image size={50} source={{ uri: user?.profilePhoto }} />
				<Text variant="titleMedium" style={{ marginLeft: 10 }}>
					{user?.name}
				</Text>
			</View>
			<TextInput
				mode="outlined"
				multiline
				placeholder="Share your thoughts"
				value={content}
				onChangeText={setContent}
				maxLength={2000}
				style={[styles.input, { backgroundColor: theme.colors.surface }]}
				outlineColor={theme.colors.outline}
				activeOutlineColor={theme.colors.onSurfaceVariant}
				focusable={false}
			/>
			<Text
				style={{
					color: theme.colors.onSurfaceVariant,
					textAlign: 'right',
					marginTop: 4
				}}
			>
				{content.length} / 2000
			</Text>
			<Button
				mode="contained"
				onPress={() => onSubmit(content)}
				loading={isPending}
				disabled={!content.trim()}
				style={styles.button}
			>
				Post
			</Button>
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	header: {
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		marginTop: 15,
		flex: 1,
		textAlignVertical: 'top',
		paddingVertical: 16,
		fontSize: 16
	},
	button: {
		marginTop: 16,
		borderRadius: 8
	}
});
