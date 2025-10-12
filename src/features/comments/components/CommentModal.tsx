import BottomSheet from '@gorhom/bottom-sheet';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState
} from 'react';
import { BackHandler, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommentInput, ICommentInputRef } from './CommentInput';
import { CommentListModalContent } from './CommentListModalContent';

export interface CommentModalRef {
	openModal: () => void;
	closeModal: () => void;
	updatePostId: (id: string) => void;
	updateCommentInputFocused: () => void;
	updateCommentContent: (content: string) => void;
	updateCommentId: (id: string) => void;
}

export const CommentModal = forwardRef<CommentModalRef>((_props, ref) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const [sheetIndex, setSheetIndex] = useState<number>(-1);
	const [postId, setPostId] = useState<string>('');
	const bottomSheetRef = useRef<BottomSheet | null>(null);
	const commentInputRef = useRef<ICommentInputRef | null>(null);

	const snapPoints = useMemo(() => ['100%'], []);

	const updatePostId = (id: string) => {
		setPostId(id);
	};
	const openModal = () => {
		bottomSheetRef.current?.expand();
	};
	const closeModal = () => {
		bottomSheetRef.current?.close();
	};
	const updateCommentInputFocused = () => {
		commentInputRef.current?.updateIsFocused(true);
	};
	const updateCommentContent = (content: string) => {
		commentInputRef.current?.updateContent(content);
	};
	const updateCommentId = (id: string) => {
		commentInputRef.current?.updateCommentId(id);
	};

	useImperativeHandle(ref, () => ({
		updatePostId,
		openModal,
		closeModal,
		updateCommentInputFocused,
		updateCommentContent,
		updateCommentId
	}));

	useEffect(() => {
		if (Platform.OS !== 'android') return;

		const backAction = () => {
			if (sheetIndex >= 0) {
				bottomSheetRef.current?.close();

				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, [ref, sheetIndex]);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			enablePanDownToClose
			onChange={setSheetIndex}
			backgroundStyle={{ backgroundColor: theme.colors.background }}
			handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
			topInset={insets.top}
			bottomInset={insets.bottom}
			footerComponent={() => (
				<CommentInput ref={commentInputRef} postId={postId} displayMode="modal" />
			)}
		>
			<CommentListModalContent postId={postId} />
		</BottomSheet>
	);
});
