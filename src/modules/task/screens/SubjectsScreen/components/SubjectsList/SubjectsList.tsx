import { Box, Icon, List, PressableBox, Text } from "@/components"
import { useAppTheme } from "@/hooks"
import { Subject } from "@/modules/task/model"
import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"

type SubjectsListProps = {
	subjects: Subject[]
	onSelectSubject: (subject: Subject) => void
	onListHeaderPress: () => void
	isLoading: boolean
	refresh: () => void
}

const SubjectsList: React.FC<SubjectsListProps> = ({
	subjects,
	onSelectSubject,
	onListHeaderPress,
	isLoading,
	refresh,
}) => {
	const theme = useAppTheme()
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<Subject>) => (
			<PressableBox
				onPress={() => onSelectSubject(item)}
				style={{ backgroundColor: item.color }}
				p={14}
				borderRadius={8}
				mt={14}>
				<Text preset="pMedium">{item.name}</Text>
			</PressableBox>
		),
		[]
	)

	const listHeader = useCallback(
		() => (
			<PressableBox
				onPress={onListHeaderPress}
				bg="secondsBg"
				flexDirection="row"
				alignItems="center"
				p={14}
				borderRadius={8}
				justifyContent="space-between">
				<Text preset="pMedium">Criar disciplina</Text>
				<Icon name="right" />
			</PressableBox>
		),
		[]
	)
	return (
		<Box flex={1} mt={36} gap={14}>
			<Text preset="pLargeBold">Disciplinas da sala</Text>
			<List
				data={subjects}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				ListHeaderComponent={listHeader}
				isLoading={isLoading}
				refresh={refresh}
			/>
		</Box>
	)
}

export default SubjectsList
