import { useGetClassrooms } from "@/modules/classroom/modelView"

export function useClassroomScreenModelView() {
	const { classrooms, isLoading, refresh } = useGetClassrooms()

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
