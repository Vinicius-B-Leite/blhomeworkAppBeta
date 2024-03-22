import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"

type MutateProps = {
	subjectId: string
}

type useDeleteSubjectProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useDeleteSubject({
	onError,
	onSuccess,
	classroomId,
}: useDeleteSubjectProps) {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<void, Error, MutateProps>({
		mutationFn: ({ subjectId }) => taskService.deleteSubject(subjectId),
		mutationKey: [TASK_QUERY_KEY.DELETE_SUBJECT],
		gcTime: Infinity,
		retry: false,
		onSuccess: async () => {
			onSuccess?.()
			await client.invalidateQueries({
				queryKey: [TASK_QUERY_KEY.GET_SUBJECT_LIST, classroomId],
			})
		},
		onError: (error) => {
			onError?.(error.message)
		},
	})

	return {
		deleteSubject: mutate,
		isLoading: isPending,
	}
}
