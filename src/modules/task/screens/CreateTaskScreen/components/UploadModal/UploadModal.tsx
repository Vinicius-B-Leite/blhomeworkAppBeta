import { Box, Icon, List, PressableBox, Text } from "@/components"
import { mimeTypesArray } from "@/constant"
import { useAppTheme } from "@/hooks"
import { File } from "@/modules/task/model"
import { Theme } from "@/theme"
import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"

type UploadModalProps = {
	selectDocuments: () => void
	uploads: File[]
	removeDocument: (doc: File) => void
}
const UploadModal: React.FC<UploadModalProps> = ({
	selectDocuments,
	uploads,
	removeDocument,
}) => {
	const theme = useAppTheme()

	const renderItem = useCallback(({ item, index }: ListRenderItemInfo<File>) => {
		const extention = item.extension.slice(1)

		const colorMap: { bg: keyof Theme["colors"]; color: keyof Theme["colors"] } =
			mimeTypesArray.includes(extention)
				? {
						bg: "secondDarkContrast",
						color: "scondContrast",
				  }
				: {
						bg: "thirdDarkContrast",
						color: "thirdContrast",
				  }

		return (
			<Box
				flexDirection="row"
				bg="bg"
				width={"100%"}
				alignItems="center"
				justifyContent="space-between"
				paddingVertical={4}
				paddingHorizontal={14}
				borderRadius={8}
				mt={14}>
				<Box flexDirection="row" gap={14} alignItems="center" flex={1}>
					<Box bg={colorMap.bg} p={8} borderRadius={8}>
						<Text preset="pMedium" color={colorMap.color}>
							{extention.toUpperCase()}
						</Text>
					</Box>
					<Text preset="pMedium" numberOfLines={1} style={{ flex: 1 }}>
						{item.name}
					</Text>
				</Box>

				<PressableBox onPress={() => removeDocument(item)} p={4}>
					<Icon name="close" color="alert" size={24} />
				</PressableBox>
			</Box>
		)
	}, [])

	return (
		<Box p={24} alignItems="center" flex={1}>
			<Text preset="pMedium">
				Suportamos somente{" "}
				<Text
					preset="pMedium"
					color="scondContrast"
					style={{ backgroundColor: theme.colors.secondDarkContrast }}>
					imagens
				</Text>{" "}
				e{" "}
				<Text
					preset="pMedium"
					color="thirdContrast"
					style={{ backgroundColor: theme.colors.thirdDarkContrast }}>
					pdf
				</Text>
			</Text>

			<PressableBox
				onPress={selectDocuments}
				borderWidth={1}
				borderColor="contrast"
				borderRadius={10}
				alignItems="center"
				justifyContent="center"
				gap={12}
				mt={24}
				paddingVertical={36}
				width={"100%"}
				bg="darkContrast">
				<Icon name="upload" color="contrast" size={73} />
				<Text preset="pMedium">Selecione um arquivo</Text>
			</PressableBox>

			<List
				isLoading={false}
				refresh={() => {}}
				data={uploads}
				renderItem={renderItem}
			/>
		</Box>
	)
}

export default UploadModal
