import { deleteComment } from '@services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useDeleteComment(postId: string, action?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteComment,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Comment deleted successfully'
			});

			action?.();

			await queryClient.fetchQuery({
				queryKey: ['getCommentList', postId]
			});
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not delete comment'
			});
		}
	});
}
