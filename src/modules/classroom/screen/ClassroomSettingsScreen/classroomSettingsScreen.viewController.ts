import { useRouteParams } from "@/hooks"

import { Share } from "react-native"

import { useGetStudents, useRemoveStudentModelView } from "@/modules/classroom/modelView"
import { useAuth } from "@/modules/auth/context"
import { Student } from "@/modules/classroom/models"
import { useAlertDispatch, useToastDispatch } from "@/store"

export function useClassroomSettingsScreenViewController() {
	const params = useRouteParams("ClassroomSettingsScreen")
	const { user } = useAuth()
	const { isLoading, refresh, students } = useGetStudents({
		classroomId: params!.classroom.id,
	})
	const { showAlert } = useAlertDispatch()
	const { showToast } = useToastDispatch()
	const { classroom } = params!
	const { removeStudent: removeStudentModelView } = useRemoveStudentModelView({
		classroomId: classroom.id,
		onError: (error) => {
			showToast({
				message: error?.message || "Ocorreu um erro ao remover o aluno da sala!",
				type: "error",
			})
		},
		onSuccess: () => {
			showToast({
				message: "Aluno removido com sucesso!",
				type: "success",
			})
		},
	})

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
						removeStudentModelView({ studentId: student.id })
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
