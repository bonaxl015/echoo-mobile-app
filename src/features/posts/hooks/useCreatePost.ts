import { createPost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useCreatePost(closeModal: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post added successfully'
			});

			await queryClient.fetchQuery({
				queryKey: ['getPostList']
			});

			closeModal?.();
		},
		onError: () => {
			Toast.show({
				type: 'success',
				text1: 'Error',
				text2: 'Could not create post'
			});
		}
	});
}
