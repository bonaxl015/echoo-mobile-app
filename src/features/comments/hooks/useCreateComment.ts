import { createComment } from '@services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useCreateComment(actions?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createComment,
		onSuccess: async (data) => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Comment added successfully'
			});

			actions?.();

			await queryClient.fetchQuery({
				queryKey: ['getCommentList', data?.comment.postId]
			});
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not add comment'
			});
		}
	});
}
