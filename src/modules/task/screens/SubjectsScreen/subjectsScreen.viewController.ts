import { useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useDeleteSubject, useGetSubjectListModelView } from "@/modules/task/modelView"
import {
	useAlertDispatch,
	useAnimatedHeaderOptionsDispatch,
	useToastDispatch,
} from "@/store"
import { Subject } from "@/modules/task/model"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const params = useRouteParams("Subjects")
	const classroomId = params!.classroomId
	const selectedSubjectId = params?.selectedSubjectId
	const onSelectSubject = params!.onSelectSubject
	const { showAlert } = useAlertDispatch()
	const { showToast } = useToastDispatch()
	const { showAnimatedHeaderOptions, hideAnimatedHeaderOptions } =
		useAnimatedHeaderOptionsDispatch()
	const { deleteSubject, isLoading: isDeleteSubjectLoading } = useDeleteSubject({
		classroomId: classroomId,
		onError: () => {
			showToast({ message: "Erro ao deletar disciplinas!", type: "error" })
		},
	})

	const { isLoading, subjectList, refresh } = useGetSubjectListModelView({
		classroomId: classroomId,
		onError: () => {
			showToast({ message: "Erro ao buscar disciplinas!", type: "error" })
		},
	})

	const handleNavigateToCreateSubject = () => {
		navigation.navigate("TaskRoutes", {
			screen: "UpsertSubjectScreen",
			params: {
				classroomId: classroomId,
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
					onPress: () => {
						showAlert({
							title: "Deletar disciplina",
							message: `Você tem certeza que deseja deletar a disciplina ${subject.name}?`,
							buttons: [
								{
									text: "Sim",
									type: "confirm",
									onPress: () => {
										const canDeleteSubject =
											subject.id !== selectedSubjectId

										if (canDeleteSubject) {
											deleteSubject({ subjectId: subject.id })

											return
										}
										showToast({
											message:
												"Você não pode deletar a disciplina selecionada!",
											type: "error",
										})
									},
								},
								{
									text: "Não",
									type: "cancel",
								},
							],
						})
					},
					isLoading: isDeleteSubjectLoading,
				},
				{
					iconsName: "pen",
					onPress: () => {
						navigation.navigate("TaskRoutes", {
							screen: "UpsertSubjectScreen",
							params: {
								classroomId: classroomId,
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
