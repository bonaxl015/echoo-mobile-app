import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
	return (
		<SafeAreaView>
			<View>
				<Text style={{ color: '#454545' }}>Settings</Text>
			</View>
		</SafeAreaView>
	);
}
