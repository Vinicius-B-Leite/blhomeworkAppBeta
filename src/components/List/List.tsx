import { useAppTheme } from "@/hooks"
import React from "react"
import { FlatList, FlatListProps, RefreshControl, View } from "react-native"

type ListProps<ItemT> = Omit<FlatListProps<ItemT>, "refreshControl" | "refreshing"> & {
	isLoading: boolean
	refresh: () => void
}
export const List = <ItemT,>(props: ListProps<ItemT>) => {
	const theme = useAppTheme()
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			refreshing={props.isLoading}
			refreshControl={
				<RefreshControl
					refreshing={props.isLoading}
					onRefresh={props.refresh}
					colors={[theme.colors.contrast]}
					tintColor={theme.colors.contrast}
					testID="refreshControl"
				/>
			}
			{...props}
		/>
	)
}
