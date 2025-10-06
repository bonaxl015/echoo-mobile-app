import { LikeObject } from '@services/like/types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { QUERY_TYPE, useGetLikeList } from '../hooks/useGetLikeList';
import useLikeListProps from '../hooks/useLikeListProps';

interface ILikesList {
	id: string;
	type: keyof typeof QUERY_TYPE;
}

export function LikesList({ id, type }: ILikesList) {
	const theme = useTheme();
	const { data, isFetching, hasNextPage, fetchNextPage } = useGetLikeList(id, type);
	const { renderItem, onEndReached } = useLikeListProps({
		hasNextPage,
		fetchNextPage
	});

	const likes = (data?.pages.flatMap((page) => page?.likes) as LikeObject[]) || [];

	const renderContent = (() => {
		if (isFetching) {
			return (
				<View style={[styles.container, { backgroundColor: theme.colors.background }]}>
					<View style={styles.center}>
						<ActivityIndicator size="large" color={theme.colors.primary} />
					</View>
				</View>
			);
		}

		return (
			<FlatList
				data={likes}
				keyExtractor={(item, index) => item?.id ?? `like-${index}`}
				renderItem={renderItem}
				onEndReached={onEndReached}
				onEndReachedThreshold={5}
				keyboardShouldPersistTaps="handled"
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={5}
				contentContainerStyle={{ paddingBottom: 20 }}
				removeClippedSubviews
			/>
		);
	})();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.colors.background
			}}
		>
			{renderContent}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
