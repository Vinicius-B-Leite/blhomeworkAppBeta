import { useForm } from "react-hook-form"
import { CreateSubjectSchema, createSubjectSchema } from "./upsertSubjectSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateSubject, useupdateSubject } from "@/modules/task/modelView"
import { useRouteParams } from "@/hooks"
import { returnedResults } from "reanimated-color-picker"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useUpsertSubjectScreenViewController() {
	const params = useRouteParams("UpsertSubjectScreen")
	const classroomId = params!.classroomId
	const isUpdate = params!.isUpdate
	const subject = params?.subject
	const navigation = useNavigation()
	const { showToast } = useToastDispatch()
	const {
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<CreateSubjectSchema>({
		resolver: zodResolver(createSubjectSchema),
		defaultValues: {
			color: isUpdate ? subject!.color : "rgb(255, 0, 0)",
			name: isUpdate ? subject!.name : "",
			shortName: isUpdate ? subject!.shortName : "",
		},
	})

	const { createSubject, isLoading: isCreateSubjectLoading } = useCreateSubject({
		classroomId: classroomId,
		onSuccess: () => {
			showToast({ message: "Disciplina criada com sucesso!", type: "success" })
			navigation.goBack()
		},
		onError: (error) => {
			showToast({ message: "Erro ao criar disciplina!", type: "error" })
		},
	})
	const { isLoading: isUpdateSubjectLoading, updateSubject } = useupdateSubject({
		classroomId: classroomId,
		onSuccess: () => {
			showToast({ message: "Disciplina atualizada com sucesso!", type: "success" })
			navigation.goBack()
		},
		onError: (error) => {
			showToast({ message: "Erro ao atualizar disciplina!", type: "error" })
		},
	})
	const onSelectColor = ({ rgb }: returnedResults) => {
		setValue("color", rgb)
	}

	const handleCreateSubject = () => {
		handleSubmit((data) => {
			if (isUpdate) {
				updateSubject({
					subject: {
						id: subject!.id,
						color: data.color,
						name: data.name,
						shortName: data.shortName,
					},
				})
				return
			}
			createSubject({
				subject: {
					color: data.color,
					name: data.name,
					shortName: data.shortName,
				},
				classroomId: classroomId,
			})
		})()
	}
	return {
		onSelectColor,
		selectedColor: watch("color"),
		subjectName: watch("name"),
		shortName: watch("shortName"),
		control,
		handleCreateSubject,
		errors,
		isLoading: isCreateSubjectLoading || isUpdateSubjectLoading,
		isUpdate,
		subject,
	}
}
