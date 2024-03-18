import { Container, FloatButton, Text, Header, List } from "@/components"

import React, { useCallback } from "react"
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native"
import TaskItem from "./components/TaskItem/TaskItem"
import { useAppTheme, useRouteParams } from "@/hooks"
import { useTaskListScreenViewController } from "./taskListScreen.viewController"
import { Task } from "@/modules/task/model"

export const TaskListScreen: React.FC = () => {
	const params = useRouteParams("TaskList")
	const { adminId, id, title } = params!.classroom
	const theme = useAppTheme()
	const {
		currentUserIsAdmin,
		isLoading,
		taskList,
		handleNavigateToCreateTask,
		refresh,
	} = useTaskListScreenViewController({
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
