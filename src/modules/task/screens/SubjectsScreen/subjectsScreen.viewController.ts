import { useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useDeleteSubject, useGetSubjectListModelView } from "@/modules/task/modelView"
import {
	useAnimatedHeaderOptionsConfig,
	useAnimatedHeaderOptionsDispatch,
	useToastDispatch,
} from "@/store"
import { Subject } from "../../model"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const params = useRouteParams("Subjects")
	const onSelectSubject = params!.onSelectSubject

	const { showToast } = useToastDispatch()
	const { showAnimatedHeaderOptions, hideAnimatedHeaderOptions } =
		useAnimatedHeaderOptionsDispatch()
	const { deleteSubject, isLoading: isDeleteSubjectLoading } = useDeleteSubject({
		classroomId: params!.classroomId,
		onError: () => {
			showToast({ message: "Erro ao deletar disciplinas!", type: "error" })
		},
	})

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
				isUpdate: false,
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
					onPress: () => deleteSubject({ subjectId: subject.id }),
					isLoading: isDeleteSubjectLoading,
				},
				{
					iconsName: "pen",
					onPress: () => {
						navigation.navigate("TaskRoutes", {
							screen: "CreateSubject",
							params: {
								classroomId: params!.classroomId,
								subject: subject,
								isUpdate: true,
							},
						})
					},
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
