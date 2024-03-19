import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService, Task, Upload } from "../model"
import { TASK_QUERY_KEY } from "../api"
import { CoumnModelViewProps } from "@/types"
import { useNavigation } from "@react-navigation/native"

type MutateProps = {
	classroomId: string
	task: Omit<Task, "id" | "subject">
	subjectId: string
	files?: Upload[]
}

type useCreateTaskProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useCreateTask({ classroomId, onError, onSuccess }: useCreateTaskProps) {
	const client = useQueryClient()
	const navigation = useNavigation()
	const { mutate, isPending } = useMutation<Task, Error, MutateProps>({
		mutationFn: ({ classroomId, task, subjectId, files }) =>
			taskService.createTask(
				{
					deadLine: task.deadLine,
					title: task.title,
					description: task.description,
				},
				classroomId,
				subjectId,
				files
			),
		mutationKey: [TASK_QUERY_KEY.CREATE_TASK],
		gcTime: Infinity,
		retry: false,
		onSuccess: async () => {
			onSuccess?.()
			await client.invalidateQueries({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, classroomId],
			})
			navigation.goBack()
		},
		onError: (error) => {
			console.log("error", error.message)

			onError?.(error.message)
		},
	})

	return {
		createTaskt: mutate,
		isLoading: isPending,
	}
}
