import { Container, FloatButton, Text } from "@/components"
import { Header } from "@/components"
import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo } from "react-native"
import TaskItem from "./components/TaskItem/TaskItem"
import { useRouteParams } from "@/hooks"
import { useTaskListScreenViewController } from "./taskListScreen.viewController"

const data = [
	{
		title: "exercicio para prova",
		id: "1",
		deadLine: new Date(),
		subject: {
			name: "Matemática",
			id: "1",
			shortName: "MAT",
			color: "#FF0000",
		},
	},
	{
		title: "exercicio para prova",
		deadLine: new Date(),

		id: "2",
		subject: {
			name: "Biologia",
			id: "2",
			shortName: "BIO",
			color: "#00FF00",
		},
	},
	{
		title: "exercicio para prova",
		deadLine: new Date(),

		id: "3",
		subject: {
			name: "Português",
			id: "3",
			shortName: "POR",
			color: "#0000FF",
		},
	},
]

export const TaskListScreen: React.FC = () => {
	const params = useRouteParams("TaskList")
	const classroomId = params?.classroomId || ""
	const classroomAdminId = params?.classroomAdmin || ""

	const { currentUserIsAdmin } = useTaskListScreenViewController({
		classroomAdminId,
	})

	const TaskListItem = useCallback(
		({ item }: ListRenderItemInfo<(typeof data)[0]>) => <TaskItem task={item} />,
		[]
	)
	return (
		<Container>
			<Header />
			<Text preset="tMedium" mt={24}>
				Tarefas
			</Text>
			<Text preset="pMedium" mb={24}>
				Desenvolvimento de Sistema - Tarde
			</Text>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={TaskListItem}
			/>

			{currentUserIsAdmin && <FloatButton onPress={() => {}} />}
		</Container>
	)
}
