import { deletePost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useDeletePost(actions?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post deleted successfully'
			});

			actions?.();

			await queryClient.fetchQuery({
				queryKey: ['getPostList']
			});
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not delete post'
			});
		}
	});
}
