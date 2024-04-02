import { useGetClassrooms } from "@/modules/classroom/modelView"
import { useAnimatedHeaderOptionsDispatch, useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { ClassroomType } from "@/modules/classroom/models"
import { useAuth } from "@/modules/auth/context"
import { useAppTheme } from "@/hooks"

export function useClassroomScreenViewController() {
	const { showToast } = useToastDispatch()
	const { user } = useAuth()
	const theme = useAppTheme()
	const { showAnimatedHeaderOptions, hideAnimatedHeaderOptions } =
		useAnimatedHeaderOptionsDispatch()
	const navigation = useNavigation()

	const { classrooms, isLoading, refresh } = useGetClassrooms({
		onError: () => {
			showToast({ message: "Erro ao buscar as salas!", type: "error" })
		},
	})

	const handleNavigateToTasks = (classroom: ClassroomType) => {
		hideAnimatedHeaderOptions()
		navigation.navigate("TaskRoutes", {
			screen: "TaskList",
			params: { classroom },
		})
	}
	const handleNavigateToCreateClassroom = () => {
		navigation.navigate("ClassroomRoutes", {
			screen: "UpsertClassroomScreen",
		})
	}
	const handleNavigateToEnterClassroom = () => {
		navigation.navigate("ClassroomRoutes", {
			screen: "EnterClassroomScreen",
		})
	}
	const handleOpenAnimatedHeader = (classroom: ClassroomType) => {
		const isAdmin = user!.uid === classroom.adminId
		if (isAdmin) {
			showAnimatedHeaderOptions({
				title: classroom.title,
				titleColor: theme.colors.text,
				rightOptions: [
					{
						iconsName: "settings",
						onPress: () => {
							navigation.navigate("ClassroomRoutes", {
								screen: "ClassroomSettingsScreen",
								params: { classroom },
							})
						},
					},
					{
						iconsName: "pen",
						onPress: () => {
							navigation.navigate("ClassroomRoutes", {
								screen: "UpsertClassroomScreen",
								params: { classroom },
							})
						},
					},
				],
			})
		}
	}

	return {
		handleNavigateToTasks,
		isLoading,
		classrooms,
		refresh,
		handleNavigateToCreateClassroom,
		handleNavigateToEnterClassroom,
		handleOpenAnimatedHeader,
	}
}
