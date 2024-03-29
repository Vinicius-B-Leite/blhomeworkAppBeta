import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import { ClassroomType, classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"

export function useGetClassrooms(props?: CoumnModelViewProps<string, ClassroomType[]>) {
	const { user } = useAuth()
	const { data, error, refetch, isFetching } = useQuery<ClassroomType[], Error>({
		queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS, user?.uid],
		queryFn: () => classroomService.getClassrooms(user!.uid),
		enabled: !!user?.uid,
	})
	useEffect(() => {
		if (error) {
			props?.onError && props.onError(error.message)
		}
	}, [error])

	return {
		classrooms: data || [],
		isLoading: isFetching,
		refresh: refetch,
	}
}
