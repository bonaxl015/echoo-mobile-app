import React, { ReactNode, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

interface IAnimatedModal {
	children: ReactNode;
	modalVisible: boolean;
	onDismiss: () => void;
}

const screenHeight = Dimensions.get('window').height;

export default function AnimatedModal({ children, modalVisible, onDismiss }: IAnimatedModal) {
	const translateY = useSharedValue(screenHeight);

	useEffect(() => {
		if (modalVisible) {
			translateY.value = withTiming(0, { duration: 500 });
		} else {
			translateY.value = withTiming(screenHeight, { duration: 500 });
		}
	}, [modalVisible, translateY]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }]
	}));

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			if (event.translationY > 0) {
				translateY.value = event.translationY;
			}
		})
		.onEnd((event) => {
			if (event.translationY > 150) {
				scheduleOnRN(onDismiss);
			} else {
				translateY.value = withTiming(0, { duration: 200 });
			}
		});

	return (
		<Portal>
			<Modal
				visible={modalVisible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[styles.animatedContent, animatedStyle]}>{children}</Animated.View>
				</GestureDetector>
			</Modal>
		</Portal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		padding: 0,
		margin: 0
	},
	animatedContent: {
		flex: 1
	}
});
