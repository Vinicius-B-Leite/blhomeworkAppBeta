import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Subject, taskService } from "@/modules/task/model"
import { useEffect } from "react"
import { useHandleGet } from "@/hooks"

type useSubjectListModelViewProps = Pick<
	CoumnModelViewProps<string | null, void>,
	"onError"
> & {
	classroomId: string
}
export function useGetSubjectListModelView(props: useSubjectListModelViewProps) {
	const { data, isLoading, refresh } = useHandleGet({
		getFn: () => taskService.getSubjectList(props.classroomId),
		queryKey: [TASK_QUERY_KEY.GET_SUBJECT_LIST, props.classroomId],
		onError: (error) => props?.onError?.(error),
		enabled: !!props.classroomId,
	})

	return {
		subjectList: data,
		isLoading: isLoading,
		refresh: () => {
			refresh()
		},
	}
}
