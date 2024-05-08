import { CoumnModelViewProps } from "@/types"

import { classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { useHandleGet } from "@/hooks"

type UseGetClassroomByIdProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useGetClassroomById(props: UseGetClassroomByIdProps) {
	const { data, isLoading, refresh } = useHandleGet({
		getFn: () => classroomService.getClassroomById(props.classroomId),
		queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS_BY_ID, props.classroomId],
		enabled: !!props.classroomId,
		onError: props.onError,
	})

	return {
		classroom: data,
		isLoading: isLoading,
		refresh: refresh,
	}
}
