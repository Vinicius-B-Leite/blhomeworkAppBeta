import { useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useGetSubjectListModelView } from "../../modelView/useGetSubjectList.modelView"
import { useToastDispatch } from "@/store"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const params = useRouteParams("Subjects")
	const { showToast } = useToastDispatch()
	const { isLoading, subjectList, refresh } = useGetSubjectListModelView({
		classroomId: params!.classroomId,
		onError: () => {
			showToast({ message: "Erro ao buscar disciplinas!", type: "error" })
		},
	})

	const handleNavigateToCreateSubject = () => {
		navigation.navigate("TaskRoutes", {
			screen: "CreateSubject",
			params: {
				classroomId: params!.classroomId,
			},
		})
	}

	return {
		handleNavigateToCreateSubject,
		subjectList: subjectList ?? [],
		isLoading,
		refresh: () => refresh(),
		goBack: () => navigation.goBack(),
	}
}
