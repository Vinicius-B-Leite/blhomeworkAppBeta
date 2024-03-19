import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService, Subject } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"

type MutateProps = {
	classroomId: string
	subject: Omit<Subject, "id">
}

type useCreateSubjectProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useCreateSubject({
	classroomId,
	onError,
	onSuccess,
}: useCreateSubjectProps) {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<Subject, Error, MutateProps>({
		mutationFn: ({ classroomId, subject }) =>
			taskService.createSubject(classroomId, subject),
		mutationKey: [TASK_QUERY_KEY.CREATE_SUBJECT],
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
		createSubject: mutate,
		isLoading: isPending,
	}
}
