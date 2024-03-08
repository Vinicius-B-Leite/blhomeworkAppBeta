import { CircleImage, PressableBox, Text } from "@/components"
import { useAppTheme } from "@/hooks"
import { ClassroomType } from "@/modules/classroom/models"
import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native"

type ClassroomListProps = {
	onSelectClassroom: (classroomId: string) => void
	classroomList: ClassroomType[]
	isRefetching: boolean
	refresh: () => Promise<void>
}
const ClassroomList: React.FC<ClassroomListProps> = ({
	onSelectClassroom,
	classroomList,
	isRefetching,
	refresh,
}) => {
	const theme = useAppTheme()
	const renderItem = useCallback(({ item }: ListRenderItemInfo<ClassroomType>) => {
		return (
			<PressableBox
				onPress={() => onSelectClassroom(item.id)}
				flexDirection="row"
				alignItems="center"
				p={12}
				borderRadius={10}
				gap={14}
				bg="secondsBg">
				<CircleImage source={{ uri: item.bannerUrl }} size={40} />
				<Text preset="pMedium" numberOfLines={2} style={{ flex: 1 }}>
					{item.title}
				</Text>
			</PressableBox>
		)
	}, [])
	return (
		<FlatList
			data={classroomList}
			refreshing={isRefetching}
			refreshControl={
				<RefreshControl
					refreshing={isRefetching}
					onRefresh={refresh}
					colors={[theme.colors.contrast]}
					tintColor={theme.colors.contrast}
				/>
			}
			contentContainerStyle={{ paddingVertical: theme.spacing[20] }}
			renderItem={renderItem}
		/>
	)
}

export default ClassroomList
