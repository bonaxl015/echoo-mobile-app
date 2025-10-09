import { UserProfile } from '@features/user/components/UserProfile';
import { useGetUserProfile } from '@features/user/hooks/useGetUserProfile';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

type UserProfileParams = {
	userId: string;
};

export default function UserProfileScreen() {
	const { userId } = useLocalSearchParams<UserProfileParams>();

	const { data } = useGetUserProfile(userId);

	if (!data) {
		return null;
	}

	const user = {
		id: data.user.id,
		name: data.user.name,
		bio: data.user.bio,
		profilePhoto: data.user.profilePhoto
	};

	return <UserProfile user={user} isFullScreenMode />;
}
