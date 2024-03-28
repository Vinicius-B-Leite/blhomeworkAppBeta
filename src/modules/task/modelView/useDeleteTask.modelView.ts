import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"

type MutateProps = {
	taskId: string
}

type useDeleteTaskProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useDeleteTask({ onError, onSuccess, classroomId }: useDeleteTaskProps) {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<void, Error, MutateProps>({
		mutationFn: ({ taskId }) => taskService.deleteTask(taskId),
		mutationKey: [TASK_QUERY_KEY.DELETE_TASK],
		gcTime: Infinity,
		retry: false,
		onSuccess: async () => {
			onSuccess?.()
			await client.invalidateQueries({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, classroomId],
			})
		},
		onError: (error) => {
			onError?.(error.message)
		},
	})

	return {
		deleteTask: mutate,
		isLoading: isPending,
	}
}
