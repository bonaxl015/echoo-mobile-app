import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
	const theme = useTheme();

	return (
		<>
			<Appbar.Header>
				<Appbar.Content title="Home" />
				<Appbar.Action icon="magnify" onPress={() => {}} />
				<Appbar.Action icon="dots-vertical" onPress={() => {}} />
			</Appbar.Header>

			<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
				<Text variant="headlineMedium" style={styles.welcomeText}>
					Hey hey hey hey welcome
				</Text>

				<View style={styles.avatarRow}>
					<Avatar.Image
						size={64}
						source={{
							uri: 'https://i.pravatar.cc/300'
						}}
					/>
					<Text variant="titleMedium" style={styles.avatarText}>
						hey there user
					</Text>
				</View>

				<Card style={styles.card} mode="outlined">
					<Card.Title
						title="First Post"
						subtitle="Test layout"
						left={(props) => <Avatar.Icon {...props} icon="folder" />}
					/>
					<Card.Content>
						<Text variant="bodyMedium">Placeholder card</Text>
					</Card.Content>
					<Card.Actions>
						<Button onPress={() => {}}>Like</Button>
						<Button onPress={() => {}}>Comment</Button>
					</Card.Actions>
				</Card>

				<Card style={styles.card}>
					<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
					<Card.Content>
						<Text variant="bodyMedium" style={{ marginTop: 8 }}>
							Nice image
						</Text>
					</Card.Content>
					<Card.Actions>
						<Button onPress={() => {}}>Share</Button>
					</Card.Actions>
				</Card>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	welcomeText: {
		marginBottom: 20,
		fontWeight: 'bold'
	},
	avatarRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	avatarText: {
		marginLeft: 12
	},
	card: {
		marginBottom: 16
	}
});
