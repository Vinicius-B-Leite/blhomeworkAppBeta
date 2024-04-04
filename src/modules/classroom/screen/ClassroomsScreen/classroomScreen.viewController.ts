import { useGetClassrooms, useLeaveModelView } from "@/modules/classroom/modelView"
import { RightOptions, useAnimatedHeaderOptionsDispatch, useToastDispatch } from "@/store"
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
	const { leaveClassroom } = useLeaveModelView({
		onError: (error) => {
			showToast({
				message: error ? error.message : "Erro ao sair da tela!",
				type: "error",
			})
		},
		onSuccess: () => {
			showToast({
				message: "Saiu da sala com sucesso!",
				type: "success",
			})
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
		let rightOptions: RightOptions[] = [
			{
				iconsName: "leave",
				onPress: () => {
					leaveClassroom({ classroomId: classroom.id })
				},
			},
		]

		if (isAdmin) {
			rightOptions.push(
				{
					iconsName: "pen",
					onPress: () => {
						navigation.navigate("ClassroomRoutes", {
							screen: "UpsertClassroomScreen",
							params: { classroom },
						})
					},
				},
				{
					iconsName: "settings",
					onPress: () => {
						navigation.navigate("ClassroomRoutes", {
							screen: "ClassroomSettingsScreen",
							params: { classroom },
						})
					},
				}
			)
		}

		showAnimatedHeaderOptions({
			title: classroom.title,
			titleColor: theme.colors.text,
			rightOptions,
		})
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
