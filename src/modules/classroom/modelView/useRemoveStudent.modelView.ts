import { useMutation, useQueryClient } from "@tanstack/react-query"
import { classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { CoumnModelViewProps } from "@/types"
import {
	SubapaseClassroomError,
	getSubapaseClassroomError,
} from "@/modules/classroom/utils"

type UseEnterClassroomModelViewProps = CoumnModelViewProps<
	SubapaseClassroomError,
	void
> & {
	classroomId: string
}

export const useRemoveStudentModelView = (props: UseEnterClassroomModelViewProps) => {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<void, Error, { studentId: string }>({
		mutationFn: ({ studentId }) =>
			classroomService.removeStudent(props.classroomId, studentId),
		onSuccess: () => {
			props?.onSuccess?.()
			client.invalidateQueries({
				queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
			})
		},
		onError: async (error) => {
			const formatedError = getSubapaseClassroomError(error.message)
			if (error?.message === "Classroom or student not found") {
				await client.invalidateQueries({
					queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
				})
			}
			props?.onError?.(formatedError)
		},
		retry: false,
		gcTime: Infinity,
	})

	return {
		removeStudent: mutate,
		isLoading: isPending,
	}
}
