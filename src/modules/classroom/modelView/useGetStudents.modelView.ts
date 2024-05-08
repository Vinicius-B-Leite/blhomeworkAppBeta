import { CoumnModelViewProps } from "@/types"

import { ClassroomType, Student, classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { useHandleGet } from "@/hooks"

type useGetStudentsProps = CoumnModelViewProps<string, ClassroomType[]> & {
	classroomId: string
}
export function useGetStudents(props: useGetStudentsProps) {
	const { data, isLoading, refresh } = useHandleGet({
		getFn: () => classroomService.getStudents(props.classroomId),
		queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
		enabled: !!props.classroomId,
		onError: props.onError,
	})

	return {
		students: data || [],
		isLoading: isLoading,
		refresh: refresh,
	}
}
