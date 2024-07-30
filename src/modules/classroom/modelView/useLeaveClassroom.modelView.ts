import { useMutation, useQueryClient } from "@tanstack/react-query"
import { classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { useAuth } from "@/modules/auth/context"
import { CoumnModelViewProps } from "@/types"
import {
	SubapaseClassroomError,
	getSubapaseClassroomError,
} from "@/modules/classroom/utils"
import { CHAT_QUERY_KEYS } from "@/modules/chat/api"

type UseEnterClassroomModelViewProps = CoumnModelViewProps<SubapaseClassroomError, void>

export function useLeaveModelView(props?: UseEnterClassroomModelViewProps) {
	const { user } = useAuth()
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<void, Error, { classroomId: string }>({
		mutationKey: [CLASSROOM_QUERY_KEYS.LEAVE_CLASSROOM],
		mutationFn: ({ classroomId }) =>
			classroomService.leaveClassroom(classroomId, user!.uid),
		onSuccess: async () => {
			props?.onSuccess?.()
			await Promise.all([
				client.invalidateQueries({
					queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS, user!.uid],
				}),
				client.invalidateQueries({
					queryKey: [CHAT_QUERY_KEYS.GET_CHATS, user!.uid],
				}),
			])
		},
		onError: (error) => {
			const errorHandled = getSubapaseClassroomError(error.message)
			props?.onError?.(errorHandled)
		},
		gcTime: Infinity,
		retry: false,
	})

	return {
		leaveClassroom: mutate,
		isLoading: isPending,
	}
}
