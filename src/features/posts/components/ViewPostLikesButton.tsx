import { PATHS } from '@constants/route';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface IViewPostLikesButton {
	likesCount?: number;
	postId?: string | null;
}

export function ViewPostLikesButton({ likesCount, postId }: IViewPostLikesButton) {
	const theme = useTheme();
	const router = useRouter();

	const handleViewLikes = () => {
		if (postId) {
			router.push({ pathname: PATHS.VIEW_LIKES, params: { postId } });
		}
	};

	if (!likesCount) {
		return null;
	}

	return (
		<TouchableOpacity onPress={handleViewLikes}>
			<Text
				variant="labelLarge"
				style={{ color: theme.colors.onSurfaceVariant, textAlign: 'left' }}
			>
				{likesCount} {Number(likesCount) > 1 ? 'Likes' : 'Like'}
			</Text>
		</TouchableOpacity>
	);
}
