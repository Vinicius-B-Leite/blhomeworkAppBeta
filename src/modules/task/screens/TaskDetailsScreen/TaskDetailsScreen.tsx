import { Box, Container, Icon, List, PressableBox, Text } from "@/components"

import { formatDate } from "@/utils"
import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"
import { Upload } from "@/modules/task/model"
import { useTaskDetailsScreenViewController } from "./taskDetailsScreen.viewController"

export const TaskDetailsScreen: React.FC = () => {
	const { deadLine, description, openFile, subject, title, uploads } =
		useTaskDetailsScreenViewController()

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
		const isPdf = item.type === "pdf"
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
				<Icon
					name={isPdf ? "pdf" : "image"}
					testID={isPdf ? "pdf-icon" : "image-icon"}
				/>
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
			submitButton={{
				onPress: () => {},
				isLoading: false,
				title: "concluir",
			}}>
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
