import { UserProfile } from '@features/user/components/UserProfile';
import { useGetUserProfile } from '@features/user/hooks/useGetUserProfile';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type UserProfileParams = {
	userId: string;
};

export default function UserProfileScreen() {
	const { userId } = useLocalSearchParams<UserProfileParams>();

	const { data, isPending } = useGetUserProfile(userId);

	const user = useMemo(
		() => ({
			id: userId,
			name: data?.user.name ?? '',
			bio: data?.user.bio ?? '',
			profilePhoto: data?.user.profilePhoto ?? ''
		}),
		[data, userId]
	);

	if (isPending) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return <UserProfile user={user} isFullScreenMode />;
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
