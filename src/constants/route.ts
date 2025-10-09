export const PATHS = {
	NEWSFEED: '/(authenticated)/(tabs)/newsfeed',
	VIEW_POST: '/(authenticated)/(full-screen)/view-post',
	VIEW_USER_PROFILE: '/(authenticated)/(full-screen)/user-profile/[userId]',
	VIEW_USER_PROFILE_TAB: '/(authenticated)/(tabs)/profile',
	LOGIN: '/auth/login'
} as const;
