import { useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useGetSubjectListModelView } from "@/modules/task/modelView"
import {
	useAnimatedHeaderOptionsConfig,
	useAnimatedHeaderOptionsDispatch,
	useToastDispatch,
} from "@/store"
import { Subject } from "../../model"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const onSelectSubject = useRouteParams("Subjects")!.onSelectSubject

	const params = useRouteParams("Subjects")
	const { showToast } = useToastDispatch()
	const { showAnimatedHeaderOptions, hideAnimatedHeaderOptions } =
		useAnimatedHeaderOptionsDispatch()

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

	const onLongPressSubject = (subject: Subject) => {
		showAnimatedHeaderOptions({
			title: subject.name,
			titleColor: subject.color,
			rightOptions: [
				{
					iconsName: "trash",
					onPress: () => console.log("deletar + " + subject.name),
				},
				{
					iconsName: "pen",
					onPress: () => console.log("atualizar + " + subject.name),
				},
			],
		})
	}

	const handleSelectSubject = (subject: Subject) => {
		hideAnimatedHeaderOptions()
		onSelectSubject(subject)
	}
	return {
		handleNavigateToCreateSubject,
		subjectList: subjectList ?? [],
		isLoading,
		refresh: () => refresh(),
		goBack: () => navigation.goBack(),
		onLongPressSubject,
		handleSelectSubject,
	}
}
