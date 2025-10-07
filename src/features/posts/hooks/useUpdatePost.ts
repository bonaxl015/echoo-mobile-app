import { PATHS } from '@constants/route';
import { updatePost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useUpdatePost(actions?: () => void) {
	const queryClient = useQueryClient();
	const pathname = usePathname();

	return useMutation({
		mutationFn: updatePost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post updated successfully'
			});

			actions?.();

			if (pathname !== PATHS.NEWSFEED) {
				await queryClient.invalidateQueries({
					queryKey: ['getPostById']
				});
			} else {
				await queryClient.invalidateQueries({
					queryKey: ['getPostList']
				});
			}
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
