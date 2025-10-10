import { NORMALIZED_PATHS, PATHS } from '@constants/route';
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
		if (pathname !== NORMALIZED_PATHS.USER_SETTINGS) {
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'User data updated successfully'
			});

			router.push(PATHS.USER_SETTINGS);
		}
	};

	const updateUserProfileMutation = useMutation({
		mutationFn: updateUserProfile,
		onSuccess: async (data) => {
			if (data) {
				setUser(data.user);

				redirectToSettingsTab();
			}
		}
	});

	const updateUserProfilePhotoMutation = useMutation({
		mutationFn: updateUserProfilePhoto,
		onSuccess: async (data) => {
			if (data) {
				setUser(data.user);

				redirectToSettingsTab();
			}
		}
	});

	return {
		updateUserProfileMutation,
		updateUserProfilePhotoMutation
	};
}
