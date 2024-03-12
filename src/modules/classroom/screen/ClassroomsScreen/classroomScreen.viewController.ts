import { useGetClassrooms } from "@/modules/classroom/modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useClassroomScreenViewController() {
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()

	const { classrooms, isLoading, refresh } = useGetClassrooms({
		onError: () => {
			showToast({ message: "Erro ao buscar as salas!", type: "error" })
		},
	})

	const handleNavigateToTasks = (classroomId: string) => {
		// TODO: navigation.navigate("Tasks", {classroomId: classroomId})
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
