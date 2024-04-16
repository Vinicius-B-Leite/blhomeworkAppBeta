import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"

import { ClassroomType, classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

type UseGetClassroomByIdProps = CoumnModelViewProps<string, void> & {
	classroomId: string
}
export function useGetClassroomById(props: UseGetClassroomByIdProps) {
	const { data, error, refetch, isFetching } = useQuery<ClassroomType | null, Error>({
		queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS_BY_ID, props.classroomId],
		queryFn: () => classroomService.getClassroomById(props.classroomId),
		enabled: !!props.classroomId,
	})
	useEffect(() => {
		if (error) {
			props?.onError && props.onError(error.message)
		}
	}, [error])

	return {
		classroom: data || null,
		isLoading: isFetching,
		refresh: refetch,
	}
}
