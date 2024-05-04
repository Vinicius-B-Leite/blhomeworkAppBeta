import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Task, taskService } from "@/modules/task/model"
import { useEffect } from "react"
import { useAuth } from "@/modules/auth/context"

type useTaskListModelViewProps = Pick<
	CoumnModelViewProps<string | null, void>,
	"onError"
> & {
	classroomId: string
}
export function useGetTaskListModelView(props: useTaskListModelViewProps) {
	const { user } = useAuth()
	const { data, error, isPending, refetch } = useQuery<unknown, Error, Task[]>({
		queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, props.classroomId],
		queryFn: () => taskService.getTaskList(props.classroomId, user?.uid ?? ""),
		enabled: !!props.classroomId,
	})

	useEffect(() => {
		if (error) {
			console.log("error", error.message)

			props?.onError?.(error.message)
		}
	}, [error])

	return {
		taskList: data ?? [],
		isLoading: isPending,
		refresh: () => {
			refetch()
		},
	}
}
