import { useMutation, useQueryClient } from "@tanstack/react-query"
import { taskService } from "@/modules/task/model"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import {
	cancelScheduleNotification,
	getAllScheduleNotifications,
} from "@/service/notifications"

type MutateProps = {
	taskId: string
}

type useDoneTaskProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useDoneTask({ onError, onSuccess, classroomId }: useDoneTaskProps) {
	const client = useQueryClient()
	const { user } = useAuth()
	const { mutate, isPending } = useMutation<string, Error, MutateProps>({
		mutationFn: ({ taskId }) => taskService.markTaskAsDone(taskId, user!.uid),
		mutationKey: [TASK_QUERY_KEY.MARK_TASK_AS_DONE],
		gcTime: Infinity,
		retry: false,
		onSuccess: async (taskId) => {
			onSuccess?.()
			await client.invalidateQueries({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, classroomId],
			})

			cancellNotificationOfTaskDone(taskId)
		},
		onError: (error) => {
			onError?.(error.message)
		},
	})

	const cancellNotificationOfTaskDone = async (taskId: string) => {
		const notifications = await getAllScheduleNotifications()

		const notificationToCancel = notifications.find(
			(n) => n.content.data.taskId === taskId
		)

		if (!notificationToCancel) return
		cancelScheduleNotification({
			notificationId: notificationToCancel?.identifier,
		})
	}

	return {
		markTaskAsDone: mutate,
		isLoading: isPending,
	}
}
