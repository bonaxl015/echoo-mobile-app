import { UserProfile } from '@features/user/components/UserProfile';
import { useAuthStore } from '@store/useAuthStore';
import React from 'react';

export default function ProfileScreen() {
	const userData = useAuthStore((s) => s.user);

	if (!userData) {
		return null;
	}

	const user = {
		id: userData.id ?? '',
		name: userData.name ?? '',
		bio: userData.bio ?? '',
		profilePhoto: userData.profilePhoto ?? ''
	};

	return <UserProfile user={user} />;
}
