import { useCallback, useRef, useState } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import { useCreateComment } from './useCreateComment';
import { useUpdateComment } from './useUpdateComment';

interface IUseCommentFormOperations {
	postId: string;
}

export function useCommentFormOperations({ postId }: IUseCommentFormOperations) {
	const [content, setContent] = useState<string>('');
	const [commentId, setCommentId] = useState<string | null>(null);
	const textInputRef = useRef<NativeTextInput>(null);

	const createCommentMutation = useCreateComment();
	const updateCommentMutation = useUpdateComment();

	const handleSubmit = commentId
		? (content: string) => updateCommentMutation.mutate({ content, id: commentId, postId })
		: (content: string) => createCommentMutation.mutate({ content, postId });

	const updateContent = useCallback((value: string) => {
		setContent(value);
	}, []);

	const updateCommentId = useCallback((value: string | null) => {
		setCommentId(value);
	}, []);

	return {
		updateCommentId,
		updateContent,
		handleSubmit,
		content,
		textInputRef
	};
}
