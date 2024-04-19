import { useMutation, useQueryClient } from "@tanstack/react-query"
import { File, Task, taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"

type MutateProps = {
	task: Omit<Task, "uploads" | "subject"> & {
		subjectId: string
		files?: File[]
	}
}

type useupdateTaskProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useupdateTask({ onError, onSuccess, classroomId }: useupdateTaskProps) {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<Task, Error, MutateProps>({
		mutationFn: ({ task }) => {
			const files = task.files || []
			return taskService.updateTask(
				{
					deadLine: task.deadLine,
					title: task.title,
					description: task.description,
					id: task.id,
				},
				task.subjectId,
				files
			)
		},
		mutationKey: [TASK_QUERY_KEY.UPDATE_TASK],
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
		updateTask: mutate,
		isLoading: isPending,
	}
}
