import { Container, FloatButton, Text, Header, List } from "@/components"

import React, { useCallback } from "react"
import { ListRenderItemInfo } from "react-native"
import TaskItem from "./components/TaskItem/TaskItem"
import { useRouteParams } from "@/hooks"
import { useTaskListScreenViewController } from "./taskListScreen.viewController"
import { Task } from "@/modules/task/model"

export const TaskListScreen: React.FC = () => {
	const params = useRouteParams("TaskList")
	const { adminId, id, title } = params!.classroom

	const {
		currentUserIsAdmin,
		isLoading,
		taskList,
		handleNavigateToCreateTask,
		refresh,
		handleNavigateToTaskDetails,
	} = useTaskListScreenViewController({
		classroomAdminId: adminId,
		classroomId: id,
	})

	const TaskListItem = useCallback(
		({ item }: ListRenderItemInfo<Task>) => (
			<TaskItem onPress={() => handleNavigateToTaskDetails(item)} task={item} />
		),
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

			<List
				data={taskList}
				keyExtractor={(item) => item.id}
				renderItem={TaskListItem}
				isLoading={isLoading}
				refresh={refresh}
				testID="task-list"
			/>

			{currentUserIsAdmin && <FloatButton onPress={handleNavigateToCreateTask} />}
		</Container>
	)
}
