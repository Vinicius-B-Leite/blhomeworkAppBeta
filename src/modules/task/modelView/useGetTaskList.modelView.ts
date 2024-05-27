import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Task, taskService } from "@/modules/task/model"

import { useAuth } from "@/modules/auth/context"
import { useHandleGet } from "@/hooks"
import {
	getAllScheduleNotifications,
	scheduleNotification,
} from "@/service/notifications"

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
		onSuccess: async function scheduleTaskNotification(task) {
			const allTaskNotifications = await getAllScheduleNotifications()
			const taskIdsHasNotification = allTaskNotifications.map(
				(t) => t.content.data.taskId
			)
			const tasksUnDone = task.filter((t) => !t.isDone)
			for (const t of tasksUnDone) {
				const taskNotificationAlreadyScheduled = taskIdsHasNotification.includes(
					t.id
				)
				if (!taskNotificationAlreadyScheduled) {
					const dateLeddOneDay = new Date()
					dateLeddOneDay.setDate(t.deadLine.getDate() - 1)

					await scheduleNotification({
						title: "Não esqueça da tarefa",
						body: `Você tem uma tarefa para amanha: ${t.title} - ${t.subject.name}`,
						date: dateLeddOneDay,
						subtitle: "Tarefa",
						data: {
							taskId: t.id,
						},
					})
				}
			}
		},
	})

	return {
		taskList: data || [],
		isLoading: isLoading,
		refresh: () => {
			refresh()
		},
	}
}
