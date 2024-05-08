import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNetInfoInstance } from "@react-native-community/netinfo"

import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"
import { ClassroomType, classroomService } from "@/modules/classroom/models"
import { CLASSROOM_QUERY_KEYS } from "@/modules/classroom/api"
import { useHandleGet } from "@/hooks"

export function useGetClassrooms(props?: CoumnModelViewProps<string, ClassroomType[]>) {
	const { user } = useAuth()
	const { data, isLoading, refresh } = useHandleGet({
		getFn: () => classroomService.getClassrooms(user!.uid),
		queryKey: [CLASSROOM_QUERY_KEYS.GET_CLASSROOMS, user?.uid],
		enabled: !!user?.uid,
		onError: props?.onError,
	})

	return {
		classrooms: data || [],
		isLoading: isLoading,
		refresh: refresh,
	}
}
