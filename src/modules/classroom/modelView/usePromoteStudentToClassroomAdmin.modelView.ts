import { CoumnModelViewProps } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

type UseCreateClassroomProps = CoumnModelViewProps<string, void> & { classroomId: string }
type PromoteStudentToClassroomAdminProps = {
	studentId: string
}

export const usePromoteStudentToClassroomAdmin = (props: UseCreateClassroomProps) => {
	const client = useQueryClient()
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
			client.invalidateQueries({
				queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
			})
		},
		onError: (error) => {
			props.onError?.(error.message)
		},
	})

	return {
		promoteStudentToClassroomAdmin: mutate,
		isLoading: isPending,
	}
}
