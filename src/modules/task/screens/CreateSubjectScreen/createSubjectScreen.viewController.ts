import { useForm } from "react-hook-form"
import { CreateSubjectSchema, createSubjectSchema } from "./createSubjectSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateSubject } from "@/modules/task/modelView"
import { useRouteParams } from "@/hooks"
import { returnedResults } from "reanimated-color-picker"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useCreateSubjectScreenViewController() {
	const params = useRouteParams("CreateSubject")
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
			color: "rgb(255, 0, 0)",
			name: "",
			shortName: "",
		},
	})

	const { createSubject, isLoading } = useCreateSubject({
		classroomId: params!.classroomId,
		onSuccess: () => {
			showToast({ message: "Disciplina criada com sucesso!", type: "success" })
			navigation.goBack()
		},
		onError: (error) => {
			showToast({ message: "Erro ao criar disciplina!", type: "error" })
		},
	})
	const onSelectColor = ({ rgb }: returnedResults) => {
		setValue("color", rgb)
	}

	const handleCreateSubject = handleSubmit((data) => {
		createSubject({
			subject: {
				color: data.color,
				name: data.name,
				shortName: data.shortName,
			},
			classroomId: params!.classroomId,
		})
	})
	return {
		onSelectColor,
		selectedColor: watch("color"),
		subjectName: watch("name"),
		shortName: watch("shortName"),
		control,
		handleCreateSubject,
		errors,
		isLoading,
	}
}
