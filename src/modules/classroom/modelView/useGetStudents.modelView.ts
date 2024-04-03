import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"

import { ClassroomType, Student, classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

type useGetStudentsProps = CoumnModelViewProps<string, ClassroomType[]> & {
	classroomId: string
}
export function useGetStudents(props: useGetStudentsProps) {
	const { data, error, refetch, isFetching } = useQuery<Student[], Error>({
		queryKey: [CLASSROOM_QUERY_KEYS.GET_STUDENTS, props.classroomId],
		queryFn: () => classroomService.getStudents(props.classroomId),
		// enabled: !!props.classroomId,
	})
	useEffect(() => {
		if (error) {
			props?.onError && props.onError(error.message)
		}
	}, [error])

	return {
		students: data || [],
		isLoading: isFetching,
		refresh: refetch,
	}
}
