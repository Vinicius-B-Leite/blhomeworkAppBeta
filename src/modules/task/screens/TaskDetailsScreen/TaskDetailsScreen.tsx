import { Box, Container, Icon, IconProps, List, PressableBox, Text } from "@/components"

import { formatDate } from "@/utils"
import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"
import { Upload } from "@/modules/task/model"
import { useTaskDetailsScreenViewController } from "./taskDetailsScreen.viewController"

export const TaskDetailsScreen: React.FC = () => {
	const {
		deadLine,
		description,
		openFile,
		subject,
		title,
		uploads,
		isLoading,
		markTaskAsDone,
		id,
		isDone,
	} = useTaskDetailsScreenViewController()

	const renderHeader = useCallback(
		() => (
			<Box flex={1}>
				<Text preset="tSmallBold" mt={36} numberOfLines={2}>
					{title}
				</Text>
				<Text preset="pSmall">Data de entrega: {formatDate(deadLine)}</Text>

				<Text preset="pMedium" marginVertical={20} textAlign="justify">
					{description && description?.length > 0
						? description
						: "Sem descrição"}
				</Text>

				<Text preset="pMediumBold">Material de apoio</Text>
			</Box>
		),
		[]
	)

	const renderItem = useCallback(({ item, index }: ListRenderItemInfo<Upload>) => {
		const handleIcon = () => {
			const isPdf = item.type === "pdf"
			let name: IconProps["name"] = "image"
			let id = "image-icon"

			if (isPdf) {
				name = "pdf"
				id = "pdf-icon"
			}
			return { name, id }
		}
		return (
			<PressableBox
				onPress={() => openFile({ donwloadUrl: item.donwloadUrl })}
				flexDirection="row"
				alignItems="center"
				bg="secondsBg"
				p={12}
				borderRadius={8}
				mt={8}
				gap={12}>
				<Icon name={handleIcon().name} testID={handleIcon().id} />
				<Text preset="pMedium">
					Arquivo {index + 1}.{item.type}
				</Text>
			</PressableBox>
		)
	}, [])
	return (
		<Container
			goBack={{
				title: subject.name,
			}}
			submitButton={
				!isDone
					? {
							onPress: () => {
								markTaskAsDone({ taskId: id })
							},
							isLoading,
							title: "concluir",
					  }
					: undefined
			}>
			<List
				data={uploads}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				ListHeaderComponent={renderHeader}
				enableRefresh={false}
				ListEmptyComponent={
					<Text preset="pMedium">Nenhum arquivo disponível</Text>
				}
			/>
		</Container>
	)
}
