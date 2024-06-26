import { useAuth } from "@/modules/auth/context"
import { useDeleteTask, useGetTaskListModelView } from "@/modules/task/modelView"
import {
	useAlertDispatch,
	useAnimatedHeaderOptionsDispatch,
	useToastDispatch,
} from "@/store"
import { useNavigation, useTheme } from "@react-navigation/native"
import { Task } from "@/modules/task/model"
import { useAppTheme } from "@/hooks"
import { useState } from "react"

type UseTaskListScreenViewControllerProps = {
	classroomAdminId: string
	classroomId: string
}
export function useTaskListScreenViewController({
	classroomAdminId,
	classroomId,
}: UseTaskListScreenViewControllerProps) {
	const { user } = useAuth()
	const navigation = useNavigation()
	const { showToast } = useToastDispatch()
	const theme = useAppTheme()
	const { showAlert } = useAlertDispatch()
	const [curretnTaskInAnimatedHeader, setCurrentTaskInAnimatedHeader] =
		useState<Task | null>(null)
	const { deleteTask } = useDeleteTask({
		classroomId,
		onError: () => {
			showToast({ message: "Erro ao deletar tarefa", type: "error" })
		},
	})
	const { hideAnimatedHeaderOptions, showAnimatedHeaderOptions } =
		useAnimatedHeaderOptionsDispatch()
	const { taskList, isLoading, refresh } = useGetTaskListModelView({
		classroomId,
		onError: () => {
			showToast({ message: "Erro ao carregar tarefas", type: "error" })
		},
	})

	const handleNavigateToCreateTask = () => {
		navigation.navigate("TaskRoutes", {
			screen: "UpsertTask",
			params: {
				classroomId,
				isUpdate: false,
			},
		})
	}

	const handleNavigateToTaskDetails = (task: Task) => {
		navigation.navigate("TaskRoutes", {
			screen: "TaskDetails",
			params: {
				task,
				classroomId,
			},
		})
	}

	const userIsClassroomAdim = user?.uid == classroomAdminId
	const handleOpenTaskOptions = (task: Task) => {
		if (!userIsClassroomAdim) {
			return
		}

		setCurrentTaskInAnimatedHeader(task)

		showAnimatedHeaderOptions({
			title: task.title,
			titleColor: theme.colors.text,
			onClose: () => {
				setCurrentTaskInAnimatedHeader(null)
			},
			rightOptions: [
				{
					iconsName: "trash",
					isLoading: false,
					onPress: () => {
						showAlert({
							message: `Deseja realmente deletar a tarefa ${task.title}?`,
							buttons: [
								{
									type: "confirm",
									text: "Sim",
									onPress: () => {
										setCurrentTaskInAnimatedHeader(null)
										deleteTask({ taskId: task.id })
									},
								},
								{
									type: "cancel",
									text: "Não",
									onPress: () => {
										setCurrentTaskInAnimatedHeader(null)
									},
								},
							],
						})
					},
				},
				{
					iconsName: "pen",
					isLoading: false,
					onPress: () => {
						setCurrentTaskInAnimatedHeader(null)
						navigation.navigate("TaskRoutes", {
							screen: "UpsertTask",
							params: {
								classroomId,
								task,
								isUpdate: true,
							},
						})
					},
				},
			],
		})
	}

	return {
		currentUserIsAdmin: userIsClassroomAdim,
		taskList,
		isLoading,
		handleNavigateToCreateTask,
		refresh,
		handleNavigateToTaskDetails,
		handleOpenTaskOptions,
		curretnTaskInAnimatedHeader,
	}
}
