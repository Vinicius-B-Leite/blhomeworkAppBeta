import { useAppTheme } from "@/hooks"
import React from "react"
import { FlatList, FlatListProps, RefreshControl } from "react-native"
import EmptyList from "./components/EmptyList"

type ListProps<ItemT> = Omit<FlatListProps<ItemT>, "refreshControl" | "refreshing"> & {
	isLoading?: boolean
	refresh?: () => void
	enableRefresh?: boolean
}
export const List = <ItemT,>({
	isLoading = false,
	refresh,
	enableRefresh = true,
	...props
}: ListProps<ItemT>) => {
	const theme = useAppTheme()
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			refreshing={isLoading}
			refreshControl={
				enableRefresh ? (
					<RefreshControl
						refreshing={isLoading}
						onRefresh={refresh}
						colors={[theme.colors.contrast]}
						tintColor={theme.colors.contrast}
						testID="refreshControl"
					/>
				) : undefined
			}
			ListEmptyComponent={isLoading ? null : <EmptyList />}
			testID="list"
			{...props}
		/>
	)
}
