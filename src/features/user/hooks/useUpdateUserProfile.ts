import { PATHS } from '@constants/route';
import { updateUserProfile, updateUserProfilePhoto } from '@services/user';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export function useUpdateUserProfile() {
	const setUser = useAuthStore((s) => s.setUser);
	const router = useRouter();
	const pathname = usePathname();

	const redirectToSettingsTab = () => {
		if (pathname !== PATHS.USER_SETTINGS_NORMALIZED) {
			router.push(PATHS.USER_SETTINGS);
		}
	};

	const updateUserProfileMutation = useMutation({
		mutationFn: updateUserProfile,
		onSuccess: async (data) => {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'User data updated successfully'
			});

			if (data?.user) {
				setUser(data.user);
			}

			redirectToSettingsTab();
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not update user data'
			});
		}
	});

	const updateUserProfilePhotoMutation = useMutation({
		mutationFn: updateUserProfilePhoto,
		onSuccess: async (data) => {
			if (data?.user) {
				setUser(data.user);
			}

			redirectToSettingsTab();
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Could not update user profile photo'
			});
		}
	});

	return {
		updateUserProfileMutation,
		updateUserProfilePhotoMutation
	};
}
