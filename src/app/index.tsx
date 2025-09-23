import { useAuthStore } from '@store/useAuthStore';
import { SplashScreen, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function AuthGate() {
	const router = useRouter();
	const hasHydrated = useAuthStore((s) => s.hasHydrated);
	const token = useAuthStore((s) => s.token);

	useEffect(() => {
		if (!hasHydrated) return;

		const timeout = setTimeout(() => {
			if (useAuthStore.getState().token) {
				router.replace('/newsfeed');
			} else {
				router.replace('/auth/login');
			}

			SplashScreen.hideAsync();
		}, 10);

		return () => clearTimeout(timeout);
	}, [hasHydrated, router, token]);

	if (!hasHydrated) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size={100} color="#2E64E5" />
			</View>
		);
	}

	return null;
}
