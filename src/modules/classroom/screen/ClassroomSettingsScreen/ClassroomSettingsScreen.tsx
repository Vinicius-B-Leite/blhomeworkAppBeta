import { Box, CircleImage, Container, Icon, List, PressableBox, Text } from "@/components"
import React, { useCallback } from "react"
import { useClassroomSettingsScreenViewController } from "./classroomSettingsScreen.viewController"
import ImageNotfound from "@/assets/images/ImageNotfound.png"
import { ListRenderItemInfo } from "react-native"
import { Student } from "@/modules/classroom/models"

export const ClassroomSettingsScreen: React.FC = () => {
	const { shareClassroomCode, classroom, isLoading, refresh, students, userIsAdmin } =
		useClassroomSettingsScreenViewController()

	const renderItem = useCallback(({ item, index }: ListRenderItemInfo<Student>) => {
		const userItemIsAdmin = classroom.adminId === item.id

		return (
			<Box
				bg="secondsBg"
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				gap={14}
				paddingVertical={14}
				paddingHorizontal={14}
				borderRadius={10}
				mt={14}
				testID={`student-${index}`}>
				<Box flexDirection="row" gap={14} alignItems="center" flex={1}>
					<CircleImage
						size={40}
						source={item.avatarUrl ? { uri: item.avatarUrl } : ImageNotfound}
					/>
					<Text preset="pMedium">{item.userName}</Text>
				</Box>
				{userItemIsAdmin && (
					<Text preset="pMedium" color="contrast" testID="adm">
						adm
					</Text>
				)}
				{!userItemIsAdmin && userIsAdmin && (
					<PressableBox testID={`trashIcon-${index}`}>
						<Icon name="trash" size={18} color="alert" />
					</PressableBox>
				)}
			</Box>
		)
	}, [])

	return (
		<Container
			goBack={{
				title: "Configurações da sala",
				righComponent: (
					<PressableBox onPress={shareClassroomCode} testID="shareBtn">
						<Icon name="share" />
					</PressableBox>
				),
			}}>
			<CircleImage
				alignSelf="center"
				mt={50}
				size={130}
				source={
					classroom.bannerUrl
						? {
								uri: classroom.bannerUrl,
						  }
						: ImageNotfound
				}
				testID="classroom-banner"
			/>
			<Text
				preset="tSmallBold"
				textAlign="center"
				marginVertical={14}
				numberOfLines={2}>
				{classroom.title}
			</Text>

			<List
				data={students}
				renderItem={renderItem}
				isLoading={isLoading}
				refresh={refresh}
			/>
		</Container>
	)
}
