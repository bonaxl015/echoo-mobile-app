import { PostCard } from '@features/posts/components/PostCard';
import { Post } from '@services/post/types';
import { RefObject, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { ConfirmDialogRef } from '../components/DeletePostDialog';
import { PostFormModalRef } from '../components/PostFormModal';

interface IUsePostListProps {
	postFormModalRef: RefObject<PostFormModalRef | null>;
	postDeleteDialogRef: RefObject<ConfirmDialogRef | null>;
	hasNextPage: boolean;
	fetchNextPage: any;
}

export default function usePostListProps({
	postFormModalRef,
	postDeleteDialogRef,
	hasNextPage,
	fetchNextPage
}: IUsePostListProps) {
	const renderItem: ListRenderItem<Post> = useCallback(
		({ item }) => (
			<PostCard
				{...item}
				postFormModalRef={postFormModalRef}
				postDeleteDialogRef={postDeleteDialogRef}
			/>
		),
		[postDeleteDialogRef, postFormModalRef]
	);

	const onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	return { renderItem, onEndReached };
}
