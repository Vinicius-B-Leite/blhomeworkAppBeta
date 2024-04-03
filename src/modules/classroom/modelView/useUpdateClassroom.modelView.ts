import { useMutation, useQueryClient } from "@tanstack/react-query"

import { UpdateClassroomServiceProps, classroomService } from "@/modules/classroom/models"
import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

type UseCreateClassroomProps = CoumnModelViewProps<string, void>
export function useUpdateClassroom(props: UseCreateClassroomProps) {
	const { user } = useAuth()
	const client = useQueryClient()
	const { mutate, isPending } = useMutation<void, Error, UpdateClassroomServiceProps>({
		gcTime: Infinity,
		retry: false,
		mutationFn: ({ name, bannerUri, classroomId }) =>
			classroomService.updateClassroom({
				name,
				bannerUri,
				classroomId,
			}),
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
		updateClassroom: mutate,
		isLoading: isPending,
	}
}
