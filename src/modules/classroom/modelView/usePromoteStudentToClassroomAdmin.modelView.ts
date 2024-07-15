import { CoumnModelViewProps } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { useAuth } from "@/modules/auth/context"
import { getSubapaseClassroomError } from "../utils"

type UseCreateClassroomProps = CoumnModelViewProps<string, void> & { classroomId: string }
type PromoteStudentToClassroomAdminProps = {
	studentId: string
}

export const usePromoteStudentToClassroomAdmin = (props: UseCreateClassroomProps) => {
	const client = useQueryClient()
	const { user } = useAuth()
	const { mutate, isPending } = useMutation<
		void,
		Error,
		PromoteStudentToClassroomAdminProps
	>({
		mutationFn: ({ studentId }) =>
			classroomService.promoteStudentToClassroomAdmin(studentId, props.classroomId),
		retry: false,
		gcTime: Infinity,
		onSuccess: () => {
			props.onSuccess?.()
			Promise.all([
				client.invalidateQueries({
					queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
				}),
				client.invalidateQueries({
					queryKey: [
						CLASSROOM_QUERY_KEYS.GET_CLASSROOMS_BY_ID,
						props.classroomId,
					],
				}),
				client.invalidateQueries({
					queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS, user?.uid],
				}),
			])
		},
		onError: async (error) => {
			const formatedError = getSubapaseClassroomError(error.message)
			props.onError?.(formatedError?.message || "Erro ao promover aluno!")
			if (formatedError?.message === "Aluno não encontrado") {
				await client.invalidateQueries({
					queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
				})
			}
		},
	})

	return {
		promoteStudentToClassroomAdmin: mutate,
		isLoading: isPending,
	}
}
