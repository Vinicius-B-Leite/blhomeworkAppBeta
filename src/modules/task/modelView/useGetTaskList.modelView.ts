import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Task, taskService } from "@/modules/task/model"
import { useEffect } from "react"

type useTaskListModelViewProps = Pick<
	CoumnModelViewProps<string | null, void>,
	"onError"
> & {
	classroomId: string
}
export function useGetTaskListModelView(props: useTaskListModelViewProps) {
	const { data, error, isPending } = useQuery<unknown, Error, Task[]>({
		queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, props.classroomId],
		queryFn: () => taskService.getTaskList(props.classroomId),
		enabled: !!props.classroomId,
	})

	useEffect(() => {
		if (error) {
			props?.onError?.(error.message)
		}
	}, [error])

	return {
		taskList: data,
		isLoading: isPending,
	}
}
