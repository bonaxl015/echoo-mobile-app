import { NEWSFEED_PATH } from '@constants/route';
import { deletePost } from '@services/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useDeletePost(actions?: () => void) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const pathname = usePathname();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Post deleted successfully'
			});

			actions?.();

			if (pathname !== NEWSFEED_PATH) {
				router.back();
			}

			await queryClient.invalidateQueries({
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
