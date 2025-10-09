export const PATHS = {
	LOGIN: '/auth/login',
	NEWSFEED: '/(authenticated)/(tabs)/newsfeed',
	VIEW_POST: '/(authenticated)/(full-screen)/(post)/view-post',
	VIEW_USER_PROFILE: '/(authenticated)/(full-screen)/(user)/user-profile/[userId]',
	VIEW_USER_PROFILE_TAB: '/(authenticated)/(tabs)/profile',
	EDIT_PROFILE: '/(authenticated)/(full-screen)/(user)/edit-profile',
	USER_SETTINGS: '/(authenticated)/(tabs)/settings',
	USER_SETTINGS_NORMALIZED: '/settings'
} as const;
