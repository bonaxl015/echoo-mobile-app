import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCommentFormOperations } from '../hooks/useCommentFormOperations';

interface ICommentInput {
	postId: string;
	displayMode: 'modal' | 'details';
}

export interface ICommentInputRef {
	updateIsFocused: (value: boolean) => void;
	updateContent: (value: string) => void;
	updateCommentId: (value: string | null) => void;
}

export const CommentInput = forwardRef<ICommentInputRef, ICommentInput>(
	({ postId, displayMode }, ref) => {
		const theme = useTheme();
		const insets = useSafeAreaInsets();
		const [isFocused, setIsFocused] = useState<boolean>(false);
		const { updateCommentId, updateContent, handleSubmit, content, textInputRef } =
			useCommentFormOperations({ postId });

		useEffect(() => {
			const hideKeyboardEvent = Keyboard.addListener(
				Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
				() => {
					setIsFocused(false);
				}
			);

			return () => {
				hideKeyboardEvent.remove();
			};
		}, []);

		const updateIsFocused = useCallback(
			(value: boolean) => {
				if (!isFocused) {
					textInputRef.current?.blur();
					textInputRef.current?.focus();
					setIsFocused(value);
				}
			},
			[isFocused, textInputRef]
		);

		useImperativeHandle(ref, () => ({
			updateIsFocused,
			updateContent,
			updateCommentId
		}));

		const keyboardVerticalOffset = () => {
			if (displayMode === 'modal') {
				return isFocused ? 70 : 0;
			}

			return isFocused ? 10 : -1 * insets.bottom;
		};

		return (
			<KeyboardAvoidingView
				style={{ backgroundColor: theme.colors.background }}
				behavior="padding"
				keyboardVerticalOffset={keyboardVerticalOffset()}
			>
				<View
					style={[
						styles.container,
						{
							backgroundColor: theme.colors.background,
							borderColor: theme.colors.onSurfaceDisabled
						}
					]}
				>
					<TextInput
						ref={textInputRef}
						numberOfLines={1}
						mode="outlined"
						placeholder="Add a comment..."
						value={content}
						onChangeText={updateContent}
						maxLength={1500}
						style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
						outlineColor={theme.colors.outline}
						activeOutlineColor={theme.colors.outline}
						onFocus={() => setIsFocused(true)}
						onPress={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					{(isFocused || Boolean(content)) && (
						<IconButton
							icon="send"
							disabled={!content.trim()}
							onPress={() => {
								handleSubmit(content);
								Keyboard.dismiss();
								updateContent('');
								setIsFocused(false);
							}}
						/>
					)}
				</View>
			</KeyboardAvoidingView>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingTop: 10,
		alignItems: 'center',
		borderTopWidth: 1
	},
	textInput: {
		flex: 1,
		paddingVertical: 10,
		height: 28
	}
});
