import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Subject, taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"

type MutateProps = {
	subject: Subject
}

type useupdateSubjectProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useupdateSubject({
	onError,
	onSuccess,
	classroomId,
}: useupdateSubjectProps) {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<Subject, Error, MutateProps>({
		mutationFn: ({ subject }) => taskService.updateSubject(subject),
		mutationKey: [TASK_QUERY_KEY.UPDATE_SUBJECT],
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
		updateSubject: mutate,
		isLoading: isPending,
	}
}
