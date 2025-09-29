import { createPost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useCreatePost(actions?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post added successfully'
			});

			actions?.();

			await queryClient.invalidateQueries({
				queryKey: ['getPostList']
			});
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not create post'
			});
		}
	});
}
