import { useRouteParams } from "@/hooks"

import { Share } from "react-native"

import { useGetStudents } from "@/modules/classroom/modelView"
import { useAuth } from "@/modules/auth/context"

export function useClassroomSettingsScreenViewController() {
	const params = useRouteParams("ClassroomSettingsScreen")
	const { user } = useAuth()
	const { isLoading, refresh, students } = useGetStudents({
		classroomId: params!.classroom.id,
	})
	const { classroom } = params!

	const shareClassroomCode = async () => {
		const message = `Olá, entre na minha sala de aula com o código: ${classroom.id}`
		await Share.share({
			message,
			title: "Código da sala de aula",
		})
	}

	return {
		shareClassroomCode,
		classroom,
		students,
		isLoading,
		refresh,
		userIsAdmin: classroom.adminId === user!.uid,
	}
}
