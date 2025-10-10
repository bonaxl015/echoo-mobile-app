import { NORMALIZED_PATHS } from '@constants/route';
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
		onSuccess: async (data) => {
			if (data) {
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'Post deleted successfully'
				});

				actions?.();

				if (pathname !== NORMALIZED_PATHS.NEWSFEED) {
					router.back();
				}

				await queryClient.invalidateQueries({
					queryKey: ['getPostList']
				});
			}
		}
	});
}
