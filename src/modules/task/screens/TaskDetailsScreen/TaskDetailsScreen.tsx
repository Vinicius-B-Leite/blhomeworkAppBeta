import { Box, Container, Icon, List, PressableBox, Text } from "@/components"
import { useRouteParams } from "@/hooks"
import { formatDate } from "@/utils"
import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"
import { Upload } from "../../model"

export const TaskDetailsScreen: React.FC = () => {
	const params = useRouteParams("TaskDetails")
	const { deadLine, id, subject, title, uploads, description } = params!.task

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
				flexDirection="row"
				alignItems="center"
				bg="secondsBg"
				p={12}
				borderRadius={8}
				mt={8}
				gap={12}>
				<Icon name={isPdf ? "pdf" : "image"} />
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
