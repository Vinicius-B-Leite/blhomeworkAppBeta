import { Box, Icon, PressableBox, Text } from "@/components"
import { Subject } from "@/modules/task/model"
import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo, View } from "react-native"

type SubjectsListProps = {
	subjects: Subject[]
	onSelectSubject: (subject: Subject) => void
	onListHeaderPress: () => void
}

const SubjectsList: React.FC<SubjectsListProps> = ({
	subjects,
	onSelectSubject,
	onListHeaderPress,
}) => {
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
			<Text preset="pLargeBold">Minhas disciplinas</Text>
			<FlatList
				data={subjects}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				ListHeaderComponent={listHeader}
				showsVerticalScrollIndicator={false}
			/>
		</Box>
	)
}

export default SubjectsList
