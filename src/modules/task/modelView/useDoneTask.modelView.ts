import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"

type MutateProps = {
	taskId: string
}

type useDoneTaskProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useDoneTask({ onError, onSuccess, classroomId }: useDoneTaskProps) {
	const client = useQueryClient()
	const { user } = useAuth()
	const { mutate, isPending } = useMutation<void, Error, MutateProps>({
		mutationFn: ({ taskId }) => taskService.markTaskAsDone(taskId, user!.uid),
		mutationKey: [TASK_QUERY_KEY.MARK_TASK_AS_DONE],
		gcTime: Infinity,
		retry: false,
		onSuccess: async () => {
			onSuccess?.()
			await client.invalidateQueries({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, classroomId],
			})
		},
		onError: (error) => {
			console.log(error.message)

			onError?.(error.message)
		},
	})

	return {
		markTaskAsDone: mutate,
		isLoading: isPending,
	}
}
