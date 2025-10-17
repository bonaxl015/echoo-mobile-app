export const PATHS = {
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	FORGOT_PASSWORD: '/auth/forgot-password',
	NEWSFEED: '/(authenticated)/(tabs)/newsfeed',
	VIEW_POST: '/(authenticated)/(full-screen)/(post)/view-post',
	VIEW_USER_PROFILE: '/(authenticated)/(full-screen)/(user)/user-profile/[userId]',
	VIEW_USER_PROFILE_TAB: '/(authenticated)/(tabs)/profile',
	EDIT_PROFILE: '/(authenticated)/(full-screen)/(user)/edit-profile',
	USER_SETTINGS: '/(authenticated)/(tabs)/settings',
	VIEW_LIKES: '/(authenticated)/(full-screen)/(like)/view-likes'
} as const;

export const NORMALIZED_PATHS = {
	NEWSFEED: '/newsfeed',
	USER_SETTINGS: '/settings',
	PROFILE: '/profile'
} as const;
