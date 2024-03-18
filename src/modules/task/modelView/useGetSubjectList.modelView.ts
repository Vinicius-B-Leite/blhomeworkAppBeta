import { useQuery } from "@tanstack/react-query"
import { TASK_QUERY_KEY } from "@/modules/task/api"
import { CoumnModelViewProps } from "@/types"
import { Subject, taskService } from "@/modules/task/model"
import { useEffect } from "react"

type useSubjectListModelViewProps = Pick<
	CoumnModelViewProps<string | null, void>,
	"onError"
> & {
	classroomId: string
}
export function useGetSubjectListModelView(props: useSubjectListModelViewProps) {
	const { data, error, isPending, refetch } = useQuery<unknown, Error, Subject[]>({
		queryKey: [TASK_QUERY_KEY.GET_SUBJECT_LIST, props.classroomId],
		queryFn: () => taskService.getSubjectList(props.classroomId),
		enabled: !!props.classroomId,
	})

	useEffect(() => {
		if (error) {
			props?.onError?.(error.message)
		}
	}, [error])

	return {
		subjectList: data,
		isLoading: isPending,
		refresh: () => {
			refetch()
		},
	}
}
