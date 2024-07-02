import { useForm } from "react-hook-form"
import {
	CreateSubjectSchema,
	createSubjectSchema,
	rgbColorRegex,
} from "./upsertSubjectSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateSubject, useupdateSubject } from "@/modules/task/modelView"
import { useRouteParams } from "@/hooks"
import { returnedResults } from "reanimated-color-picker"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"

export function useUpsertSubjectScreenViewController() {
	const params = useRouteParams("UpsertSubjectScreen")
	const classroomId = params!.classroomId
	const isUpdate = params!.isUpdate
	const subject = params?.subject
	const navigation = useNavigation()
	const { showToast } = useToastDispatch()
	const initialColor = isUpdate ? subject!.color : "rgb(255, 0, 0)"

	const [colorPickerValue, setColorPickerValue] = useState(initialColor)
	const {
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<CreateSubjectSchema>({
		resolver: zodResolver(createSubjectSchema),
		defaultValues: {
			color: initialColor,
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
	const onSelectColor = useCallback(({ rgb }: returnedResults) => {
		setValue("color", rgb)
	}, [])

	const handleCreateSubject = handleSubmit((data) => {
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
	})

	const handleTitle = useCallback(() => {
		let submitBtnTitle = "Criar"
		let goBackTitle = "Criar Disciplina"

		if (isUpdate) {
			submitBtnTitle = "Salvar"
			goBackTitle = "Atualizar Disciplina"
		}

		return {
			submitBtnTitle,
			goBackTitle,
		}
	}, [isUpdate])

	const selectedColor = watch("color")

	useEffect(() => {
		if (rgbColorRegex.test(selectedColor)) {
			setColorPickerValue(selectedColor)
		}
	}, [selectedColor])

	return {
		onSelectColor,
		selectedColor,
		subjectName: watch("name"),
		shortName: watch("shortName"),
		control,
		handleCreateSubject,
		errors,
		isLoading: isCreateSubjectLoading || isUpdateSubjectLoading,
		isUpdate,
		subject,
		handleTitle,
		colorPickerValue,
	}
}
