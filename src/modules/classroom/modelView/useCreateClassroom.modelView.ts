import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CreateClassroomServiceProps, classroomService } from "@/modules/classroom/models"
import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

type UseCreateClassroomProps = CoumnModelViewProps<string, void>
export function useCreateClassroom(props: UseCreateClassroomProps) {
	const { user } = useAuth()
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<
		void,
		Error,
		Omit<CreateClassroomServiceProps, "userId">
	>({
		gcTime: Infinity,
		retry: false,
		mutationFn: (props) =>
			classroomService.createClassroom({ ...props, userId: user!.uid }),
		onSuccess: () => {
			props.onSuccess?.()
			client.invalidateQueries({
				queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS, user!.uid],
			})
		},
		onError: (error) => {
			props.onError?.(error.message)
		},
	})

	return {
		createClassroom: mutate,
		isLoading: isPending,
	}
}
