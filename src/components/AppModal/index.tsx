import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface IAppModal {
	isModalVisible: boolean;
	dismissModal: () => void;
	children: ReactNode;
}

export function AppModal({ isModalVisible, dismissModal, children }: IAppModal) {
	return (
		<Modal
			style={[styles.modal]}
			animationIn="slideInUp"
			animationOut="slideOutDown"
			animationInTiming={300}
			animationOutTiming={300}
			isVisible={isModalVisible}
			propagateSwipe
			onSwipeComplete={dismissModal}
			onBackButtonPress={dismissModal}
			swipeDirection="down"
			swipeThreshold={100}
			backdropOpacity={0.5}
		>
			{children}
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		margin: 0
	}
});
