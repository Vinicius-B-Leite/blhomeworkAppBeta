import { Box, CircleImage, Text } from "@/components"
import { useAppTheme } from "@/hooks"
import { ClassroomType } from "@/modules/classroom/models"
import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo } from "react-native"

const ClassroomList: React.FC = () => {
	const theme = useAppTheme()
	const renderItem = useCallback(({ item }: ListRenderItemInfo<ClassroomType>) => {
		return (
			<Box
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
			</Box>
		)
	}, [])
	return (
		<FlatList
			data={[
				{
					bannerUrl: "https://www.github.com/Vinicius-B-Leite.png",
					title: "Sala 1asflkajsfklasjfklasjfklasjfklajslkfjasklfjaslkfjalksjflaskjflaksjfsalkfjaslkfjsaklj",
				},
			]}
			contentContainerStyle={{ paddingVertical: theme.spacing[20] }}
			renderItem={renderItem}
		/>
	)
}

export default ClassroomList
