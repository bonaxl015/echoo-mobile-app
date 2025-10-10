import { updateComment } from '@services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export function useUpdateComment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateComment,
		onSuccess: async (data) => {
			if (data) {
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'Comment updated successfully'
				});

				await queryClient.invalidateQueries({
					queryKey: ['getCommentList', data.comment.postId]
				});
			}
		}
	});
}
