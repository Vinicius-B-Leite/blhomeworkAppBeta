import { useGetClassrooms } from "@/modules/classroom/modelView"
import { useToastDispatch } from "@/store"

export function useClassroomScreenModelView() {
	const { showToast } = useToastDispatch()

	const { classrooms, isLoading, refresh } = useGetClassrooms({
		onError: () => {
			showToast({ message: "Erro ao buscar as salas!", type: "error" })
		},
	})

	const handleNavigateToProfile = () => {
		// TODO: navigation.navigate("Profile")
	}

	const handleNavigateToTasks = (classroomId: string) => {
		// TODO: navigation.navigate("Tasks", {classroomId: classroomId})
	}

	return {
		handleNavigateToProfile,
		handleNavigateToTasks,
		isLoading,
		classrooms,
		refresh,
	}
}
