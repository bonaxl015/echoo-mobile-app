import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	TextInput as NativeTextInput,
	Platform,
	StyleSheet,
	View
} from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ICommentInput {
	onSubmit: (content: string) => void;
}

export interface ICommentInputRef {
	updateIsFocused: (value: boolean) => void;
}

export const CommentInput = forwardRef<ICommentInputRef, ICommentInput>(({ onSubmit }, ref) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const [content, setContent] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const textInputRef = useRef<NativeTextInput>(null);

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

	const updateIsFocused = (value: boolean) => {
		if (!isFocused) {
			textInputRef.current?.blur();
			textInputRef.current?.focus();
			setIsFocused(value);
		}
	};

	useImperativeHandle(ref, () => ({
		updateIsFocused
	}));

	return (
		<KeyboardAvoidingView
			style={{ backgroundColor: theme.colors.background, paddingBottom: insets.bottom }}
			behavior="padding"
			keyboardVerticalOffset={isFocused ? 10 : -1 * insets.bottom}
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
					mode="outlined"
					placeholder="Add a comment..."
					value={content}
					onChangeText={setContent}
					maxLength={1500}
					style={{ flex: 1, paddingVertical: 10, backgroundColor: theme.colors.surface }}
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
							onSubmit(content);
							Keyboard.dismiss();
							setContent('');
							setIsFocused(false);
						}}
					/>
				)}
			</View>
		</KeyboardAvoidingView>
	);
});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingTop: 10,
		alignItems: 'center',
		borderTopWidth: 1
	}
});
