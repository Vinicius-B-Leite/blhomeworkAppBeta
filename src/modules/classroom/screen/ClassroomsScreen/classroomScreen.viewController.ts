import { useGetClassrooms } from "@/modules/classroom/modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { ClassroomType } from "@/modules/classroom/models"

export function useClassroomScreenViewController() {
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()

	const { classrooms, isLoading, refresh } = useGetClassrooms({
		onError: () => {
			showToast({ message: "Erro ao buscar as salas!", type: "error" })
		},
	})

	const handleNavigateToTasks = (classroom: ClassroomType) => {
		navigation.navigate("TaskRoutes", {
			screen: "TaskList",
			params: { classroom },
		})
	}
	const handleNavigateToCreateClassroom = () => {
		navigation.navigate("ClassroomRoutes", {
			screen: "CreateClassroomScreen",
		})
	}
	const handleNavigateToEnterClassroom = () => {
		navigation.navigate("ClassroomRoutes", {
			screen: "EnterClassroomScreen",
		})
	}

	return {
		handleNavigateToTasks,
		isLoading,
		classrooms,
		refresh,
		handleNavigateToCreateClassroom,
		handleNavigateToEnterClassroom,
	}
}
