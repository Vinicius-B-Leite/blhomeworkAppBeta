import { useAuth } from "@/modules/auth/context"
import { useGetTaskListModelView } from "@/modules/task/modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

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
	const { taskList, isLoading, refresh } = useGetTaskListModelView({
		classroomId,
		onError: () => {
			showToast({ message: "Erro ao carregar tarefas", type: "error" })
		},
	})

	const handleNavigateToCreateTask = () => {
		navigation.navigate("TaskRoutes", {
			screen: "CreateTask",
			params: {
				classroomId,
			},
		})
	}

	return {
		currentUserIsAdmin: user?.uid == classroomAdminId,
		taskList,
		isLoading,
		handleNavigateToCreateTask,
		refresh,
	}
}
