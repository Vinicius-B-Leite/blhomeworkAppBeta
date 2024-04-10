import { useRouteParams } from "@/hooks"

import { Share } from "react-native"

import {
	useGetStudents,
	usePromoteStudentToClassroomAdmin,
} from "@/modules/classroom/modelView"
import { useAuth } from "@/modules/auth/context"
import { Student } from "@/modules/classroom/models"
import { useAlertDispatch } from "@/store"

export function useClassroomSettingsScreenViewController() {
	const params = useRouteParams("ClassroomSettingsScreen")
	const { user } = useAuth()
	const { isLoading, refresh, students } = useGetStudents({
		classroomId: params!.classroom.id,
	})
	const { promoteStudentToClassroomAdmin } = usePromoteStudentToClassroomAdmin({
		classroomId: params!.classroom.id,
	})
	const { showAlert } = useAlertDispatch()
	const { classroom } = params!

	const shareClassroomCode = async () => {
		const message = `Olá, entre na minha sala de aula com o código: ${classroom.id}`
		await Share.share({
			message,
			title: "Código da sala de aula",
		})
	}

	const removeStudent = async (student: Student) => {
		const currentUserIsAdmin = classroom.adminId === user!.uid

		if (!currentUserIsAdmin) return
		showAlert({
			message: `Deseja remover o aluno ${student.userName} da sala de aula?`,
			buttons: [
				{
					type: "cancel",
					text: "Não",
				},
				{
					type: "confirm",
					text: "Sim",
					onPress: () => {
						console.log("removing student")
					},
				},
			],
		})
	}

	return {
		shareClassroomCode,
		classroom,
		students,
		isLoading,
		refresh,
		userIsAdmin: classroom.adminId === user!.uid,
		removeStudent,
	}
}
