import FormTextInput from '@components/FormTextInput';
import { useUpdateUserProfile } from '@features/user/hooks/useUpdateUserProfile';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@store/useAuthStore';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, IconButton, Text } from 'react-native-paper';
import { updateUserSchema } from '../validators/updateProfile';

type EditProfileValues = {
	name: string;
	bio?: string;
};

export function UpdateUserForm() {
	const { user } = useAuthStore();
	const [avatar, setAvatar] = useState<string>('');
	const { updateUserProfileMutation, updateUserProfilePhotoMutation } = useUpdateUserProfile();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(updateUserSchema),
		defaultValues: {
			name: user?.name ?? '',
			bio: user?.bio ?? ''
		}
	});

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'images',
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8
		});

		if (!result.canceled) {
			setAvatar(result.assets[0].uri);
		}
	};

	const onSubmit = (values: EditProfileValues) => {
		if (avatar) {
			updateUserProfilePhotoMutation.mutate({ fileUri: avatar });
		}

		if (user?.name !== values.name || user.bio !== values.bio) {
			updateUserProfileMutation.mutate({
				name: values.name,
				bio: values.bio
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar.Image size={100} source={{ uri: avatar ? avatar : user?.profilePhoto }} />
				<IconButton icon="camera" onPress={pickImage} />
				<Text variant="bodySmall">Change Profile Photo</Text>
			</View>

			<FormTextInput
				control={control as unknown as Control}
				name="name"
				label="Name"
				placeholder="Name"
			/>
			<FormTextInput
				control={control as unknown as Control}
				name="bio"
				label="Bio"
				placeholder="Bio"
			/>

			<Button
				mode="contained"
				onPress={handleSubmit(onSubmit)}
				style={styles.button}
				disabled={updateUserProfilePhotoMutation.isPending || updateUserProfileMutation.isPending}
				loading={updateUserProfilePhotoMutation.isPending || updateUserProfileMutation.isPending}
			>
				Save Changes
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16
	},
	avatarContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16
	},
	button: {
		marginTop: 16,
		borderRadius: 8
	}
});
