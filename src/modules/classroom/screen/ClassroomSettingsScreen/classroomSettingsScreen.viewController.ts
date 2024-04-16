import { useRouteParams } from "@/hooks"

import { Share } from "react-native"

import {
	useGetClassroomById,
	useGetClassrooms,
	useGetStudents,
	usePromoteStudentToClassroomAdmin,
	useRemoveStudentModelView,
} from "@/modules/classroom/modelView"
import { useAuth } from "@/modules/auth/context"
import { Student } from "@/modules/classroom/models"
import { useAlertDispatch, useToastDispatch } from "@/store"

export function useClassroomSettingsScreenViewController() {
	const params = useRouteParams("ClassroomSettingsScreen")
	const { classroomId } = params!

	const { user } = useAuth()
	const { showToast } = useToastDispatch()

	const { isLoading: isLoadingClassrooms, classroom } = useGetClassroomById({
		classroomId: classroomId,
		onError: () => {
			showToast({ message: "Erro ao buscar detalhes da sala!", type: "error" })
		},
	})

	const { isLoading, refresh, students } = useGetStudents({
		classroomId: classroomId,
	})
	const { promoteStudentToClassroomAdmin } = usePromoteStudentToClassroomAdmin({
		classroomId: classroomId,
		onError: (error) => {
			showToast({ message: error, type: "error" })
		},
		onSuccess: () => {
			showToast({ message: "Aluno promovido a administrador", type: "success" })
		},
	})
	const { showAlert } = useAlertDispatch()

	const { removeStudent: removeStudentModelView } = useRemoveStudentModelView({
		classroomId: classroomId,
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
		if (!classroom?.id) return

		const message = `Olá, entre na minha sala de aula com o código: ${classroomId}`
		await Share.share({
			message,
			title: "Código da sala de aula",
		})
	}

	const removeStudent = async (student: Student) => {
		const currentUserIsAdmin = classroom?.adminId === user!.uid

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

	const handlePromoteStudentToClassroomAdmin = async (student: Student) => {
		if (!classroom) return

		const currentUserIsAdmin = classroom.adminId === user!.uid

		if (!currentUserIsAdmin) return

		showAlert({
			title: "Promover aluno",
			message: `Deseja promover o aluno ${student.userName} a administrador da sala de aula?`,
			buttons: [
				{
					type: "confirm",
					text: "Sim",
					onPress: () => {
						promoteStudentToClassroomAdmin({ studentId: student.id })
					},
				},
				{
					type: "cancel",
					text: "Não",
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
		userIsAdmin: classroom && classroom.adminId === user!.uid,
		removeStudent,
		handlePromoteStudentToClassroomAdmin,
		isLoadingClassrooms,
	}
}
