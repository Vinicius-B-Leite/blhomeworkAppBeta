import { Container, FloatButton, Text, Header } from "@/components"

import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo } from "react-native"
import TaskItem from "./components/TaskItem/TaskItem"
import { useRouteParams } from "@/hooks"
import { useTaskListScreenViewController } from "./taskListScreen.viewController"
import { Spinner } from "@/components/Spinner/Spinner"
import { Task } from "@/modules/task/model"

export const TaskListScreen: React.FC = () => {
	const params = useRouteParams("TaskList")
	const { adminId, id, title } = params!.classroom

	const { currentUserIsAdmin, isLoading, taskList } = useTaskListScreenViewController({
		classroomAdminId: adminId,
		classroomId: id,
	})

	const TaskListItem = useCallback(
		({ item }: ListRenderItemInfo<Task>) => <TaskItem task={item} />,
		[]
	)
	return (
		<Container>
			<Header />
			<Text preset="tMedium" mt={24}>
				Tarefas
			</Text>
			<Text preset="pMedium" mb={24} numberOfLines={2}>
				{title}
			</Text>

			{isLoading ? (
				<Spinner size={40} testID="spinner" />
			) : (
				<FlatList
					data={taskList}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={TaskListItem}
					testID="task-list"
				/>
			)}

			{currentUserIsAdmin && <FloatButton onPress={() => {}} />}
		</Container>
	)
}
