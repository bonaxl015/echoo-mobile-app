export type UserProfileData = {
	id: string;
	name: string;
	bio: string;
	profilePhoto: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	profilePhotoPublicId: string;
};

export type UserProfileParams = {
	id: string;
};

export type UserCurrentInfoResponse = {
	user: UserProfileData;
};

export type UserProfileResponse = UserCurrentInfoResponse;

export type UserProfileUpdateParams = {
	bio?: string;
	name?: string;
	profilePhoto?: string;
};

export type UserUpdateProfilePhotoParams = {
	fileUri: string;
};

export type UserProfileUpdateResponse = UserCurrentInfoResponse;

export type UserDeleteParams = {
	id: string;
};

export type UserDeleteResponse = {
	delete: boolean;
};
