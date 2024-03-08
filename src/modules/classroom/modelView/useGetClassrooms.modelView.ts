import { useQuery } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import { classroomService } from "../models/classroomService"
import { ClassroomType } from "../models"
import { CLASSROOM_QUERY_KEYS } from "../api/classroomQueryKey"
import { useEffect } from "react"
import { useToastDispatch } from "@/store"

export function useGetClassrooms(props?: CoumnModelViewProps<string, ClassroomType[]>) {
	const { user } = useAuth()
	const { data, error, refetch, isFetching } = useQuery<ClassroomType[], Error>({
		queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS],
		queryFn: () => classroomService.getClassrooms(user!.uid),
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
