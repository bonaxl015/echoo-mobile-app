import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';

interface ICommentInput {
	onSubmit: (content: string) => void;
}

export function CommentInput({ onSubmit }: ICommentInput) {
	const theme = useTheme();
	const [content, setContent] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<TextInput
				mode="outlined"
				multiline
				placeholder="Add a comment..."
				value={content}
				onChangeText={setContent}
				maxLength={1500}
				style={{ flex: 1, padding: 10, backgroundColor: theme.colors.surface }}
				outlineColor={theme.colors.outline}
				activeOutlineColor={theme.colors.outline}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{isFocused && (
				<IconButton
					icon="send"
					disabled={!content.trim()}
					onPress={() => {
						onSubmit(content);
						setContent('');
						setIsFocused(false);
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		alignItems: 'center'
	}
});
