import { PostList } from '@features/posts/components/PostList';
import { useGetPostByUser } from '@features/posts/hooks/useGetPostByUser';
import usePostListProps from '@features/posts/hooks/usePostListProps';
import { Post } from '@services/post/types';
import { UserProfileData } from '@services/user/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserProfileInfo } from './UserProfileInfo';

interface IUserProfile {
	user: Pick<UserProfileData, 'id' | 'name' | 'bio' | 'profilePhoto'>;
}

export function UserProfile({ user }: IUserProfile) {
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const {
		data: postData,
		isFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch
	} = useGetPostByUser(user.id);
	const { renderItem, onEndReached } = usePostListProps({
		fetchNextPage,
		hasNextPage
	});

	const posts = (postData?.pages.flatMap((page) => page?.posts) as Post[]) ?? [];

	if (!user) {
		return (
			<View style={[styles.center, { paddingBottom: insets.bottom }]}>
				<Text>No user found</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
				paddingBottom: insets.bottom
			}}
		>
			<PostList
				posts={posts}
				renderItem={renderItem}
				onEndReached={onEndReached}
				refetch={refetch}
				isFetching={isFetching}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
				ListHeaderComponent={
					<UserProfileInfo name={user.name} bio={user.bio} profilePhoto={user.profilePhoto} />
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
