import { updatePost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useUpdatePost(actions?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updatePost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post updated successfully'
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
				text2: 'Could not update post'
			});
		}
	});
}
