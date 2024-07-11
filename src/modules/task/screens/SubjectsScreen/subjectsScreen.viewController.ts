import { useDebouncedValue, useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"
import { useDeleteSubject, useGetSubjectListModelView } from "@/modules/task/modelView"
import {
	useAlertDispatch,
	useAnimatedHeaderOptionsDispatch,
	useToastDispatch,
} from "@/store"
import { Subject } from "@/modules/task/model"
import { useCallback, useMemo, useState } from "react"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const params = useRouteParams("Subjects")
	const classroomId = params!.classroomId
	const selectedSubjectId = params?.selectedSubjectId
	const onSelectSubject = params!.onSelectSubject
	const [searchSubject, setSearchSubject] = useState("")
	const debouncedSearchSubject = useDebouncedValue(searchSubject)
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

	const handleNavigateToCreateSubject = useCallback(() => {
		navigation.navigate("TaskRoutes", {
			screen: "UpsertSubjectScreen",
			params: {
				classroomId: classroomId,
				isUpdate: false,
			},
		})
	}, [])

	const onLongPressSubject = useCallback(
		(subject: Subject) => {
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
							const isSubjectSelectedInTaskForm =
								selectedSubjectId === subject.id
							if (isSubjectSelectedInTaskForm) {
								showToast({
									message:
										"Você não pode editar a disciplina selecionada!",
									type: "error",
								})

								return
							}
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
		},
		[selectedSubjectId, deleteSubject, showToast, isDeleteSubjectLoading, classroomId]
	)

	const handleSelectSubject = useCallback(
		(subject: Subject) => {
			hideAnimatedHeaderOptions()
			onSelectSubject(subject)
		},
		[hideAnimatedHeaderOptions, onSelectSubject]
	)
	const handleGoBack = useCallback(() => {
		navigation.goBack()
	}, [])

	const handleSetSearchSubject = useCallback((text: string) => {
		setSearchSubject(text)
	}, [])

	const searchedSubjectList = useMemo(() => {
		if (debouncedSearchSubject.length === 0) {
			return subjectList
		}

		return subjectList?.filter((subject) =>
			subject.name.toLowerCase().includes(debouncedSearchSubject.toLowerCase())
		)
	}, [subjectList, debouncedSearchSubject])

	return {
		handleNavigateToCreateSubject,
		subjectList: searchedSubjectList ?? [],
		isLoading,
		refresh: () => refresh(),
		goBack: handleGoBack,
		onLongPressSubject,
		handleSelectSubject,
		handleSetSearchSubject,
		searchSubject,
		isSearchingSubject: debouncedSearchSubject !== searchSubject,
	}
}
