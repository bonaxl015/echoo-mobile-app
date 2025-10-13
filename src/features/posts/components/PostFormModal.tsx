import BottomSheet from '@gorhom/bottom-sheet';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState
} from 'react';
import { BackHandler, Keyboard, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { PostForm } from './PostForm';

export interface PostFormModalRef {
	openModal: () => void;
	closeModal: () => void;
	updatePostFormData: (value: PostFormData) => void;
}

export type PostFormData = {
	id: string | null;
	content: string;
};

export const PostFormModal = forwardRef<PostFormModalRef>((_props, ref) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const bottomSheetRef = useRef<BottomSheet | null>(null);
	const previousIndexRef = useRef<number>(-1);
	const [postFormData, setPostFormData] = useState<PostFormData>({
		id: null,
		content: ''
	});

	const handleSheetChange = useCallback((index: number) => {
		if (index === -1) {
			Keyboard.dismiss();
		} else if (index < previousIndexRef.current) {
			Keyboard.dismiss();
		}
		previousIndexRef.current = index;
	}, []);

	useEffect(() => {
		if (Platform.OS !== 'android') return;

		const backAction = () => {
			if (previousIndexRef.current >= 0) {
				bottomSheetRef.current?.close();

				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, []);

	const snapPoints = useMemo(() => ['100%'], []);

	const openModal = () => {
		bottomSheetRef.current?.expand();
	};
	const closeModal = () => {
		setPostFormData({ id: null, content: '' });
		bottomSheetRef.current?.close();
	};

	const createPostMutation = useCreatePost(closeModal);
	const updatePostMutation = useUpdatePost(closeModal);

	const updatePostFormData = (value: PostFormData) => {
		setPostFormData(value);
	};

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
		updatePostFormData
	}));

	const handleFormSubmit = postFormData.id
		? (content: string) => updatePostMutation.mutate({ id: postFormData.id, content })
		: (content: string) => createPostMutation.mutate({ content });

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			onClose={closeModal}
			onChange={handleSheetChange}
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: theme.colors.background }}
			handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
			topInset={insets.top}
			bottomInset={insets.bottom}
			enableDynamicSizing={false}
			handleStyle={{ display: 'none' }}
		>
			<PostForm
				formData={postFormData}
				onSubmit={handleFormSubmit}
				isPending={postFormData.id ? updatePostMutation.isPending : createPostMutation.isPending}
			/>
		</BottomSheet>
	);
});
