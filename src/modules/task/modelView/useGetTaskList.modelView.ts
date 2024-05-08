import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Task, taskService } from "@/modules/task/model"

import { useAuth } from "@/modules/auth/context"
import { useHandleGet } from "@/hooks"

type useTaskListModelViewProps = Pick<
	CoumnModelViewProps<string | null, void>,
	"onError"
> & {
	classroomId: string
}
export function useGetTaskListModelView(props: useTaskListModelViewProps) {
	const { user } = useAuth()

	const { data, isLoading, refresh } = useHandleGet<Task[]>({
		getFn: () => taskService.getTaskList(props.classroomId, user?.uid ?? ""),
		queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, props.classroomId],
		onError: (error) => props?.onError?.(error),
		enabled: !!props.classroomId,
	})

	return {
		taskList: data || [],
		isLoading: isLoading,
		refresh: () => {
			refresh()
		},
	}
}
