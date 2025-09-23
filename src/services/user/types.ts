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
