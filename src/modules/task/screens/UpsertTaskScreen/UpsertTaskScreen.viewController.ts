import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskScreenSchema, createTaskScreenSchema } from "./upsertTaskScreenSchmea"
import { useRef, useState } from "react"
import { Subject, File } from "@/modules/task/model"
import { useNavigation } from "@react-navigation/native"
import { useRouteParams } from "@/hooks"
import { useCreateTask, useupdateTask } from "@/modules/task/modelView"
import { useToastDispatch } from "@/store"
import { getDocuments } from "@/modules/task/utils"
import BottomSheet from "@gorhom/bottom-sheet"
import { Keyboard } from "react-native"

export function useUpsertTaskViewController() {
	const navigation = useNavigation()
	const [showDatePicker, setShowDatePicker] = useState(false)
	const params = useRouteParams("UpsertTask")
	const classroomId = params!.classroomId
	const isUpdate = params!.isUpdate
	const bottomSheetRef = useRef<BottomSheet>(null)

	const taskUpdating = params?.task

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		getValues,
	} = useForm<CreateTaskScreenSchema>({
		resolver: zodResolver(createTaskScreenSchema),
		defaultValues: {
			title: isUpdate ? taskUpdating!.title : "",
			description: isUpdate ? taskUpdating!.description : "",
			deadLine: isUpdate ? taskUpdating!.deadLine : undefined,
			subject: isUpdate ? taskUpdating!.subject : undefined,
			uploads: isUpdate
				? taskUpdating!.uploads?.map((upload) => ({
						base64: "",
						extension: upload.type,
						name: upload.id,
						uri: upload.donwloadUrl,
				  }))
				: [],
		},
		mode: "onSubmit",
	})
	const documentList = watch("uploads") ?? []

	const { showToast } = useToastDispatch()
	const { createTaskt, isLoading } = useCreateTask({
		classroomId: classroomId,
		onError: () => {
			showToast({ message: "Erro ao criar tarefa!", type: "error" })
		},
	})
	const { updateTask, isLoading: isUpdateLoading } = useupdateTask({
		classroomId: classroomId,
		onError: () => {
			showToast({
				message: "Ocorreu um erro ao atualizar a tarefa!",
				type: "error",
			})
		},
		onSuccess: () => {
			showToast({ message: "Tarefa atualizada com sucesso!", type: "success" })
			navigation.goBack()
		},
	})
	const handleCreateTask = handleSubmit((data) => {
		if (isUpdate) {
			updateTask({
				task: {
					title: data.title,
					description: data.description,
					deadLine: data.deadLine,
					id: taskUpdating!.id,
					subjectId: data.subject.id,
					files: documentList,
				},
			})
			return
		}

		createTaskt({
			classroomId: classroomId,
			task: {
				title: data.title,
				description: data.description,
				deadLine: data.deadLine,
			},
			subjectId: data.subject.id,
			files: documentList,
		})
	})

	const openDatePicker = () => {
		setShowDatePicker(true)
	}

	const closeDatePicker = () => {
		setShowDatePicker(false)
	}

	const handleSelectDate = (date: Date) => {
		setValue("deadLine", date)
	}

	const handleSelectSubject = (subject: Subject) => {
		setValue("subject", { id: subject.id, name: subject.name, color: subject.color })
		navigation.goBack()
	}

	const navigateToSubjects = () => {
		navigation.navigate("TaskRoutes", {
			screen: "Subjects",
			params: {
				onSelectSubject: handleSelectSubject,
				classroomId: classroomId,
				selectedSubjectId: watch("subject")?.id,
			},
		})
	}

	const selectDocuments = async () => {
		const documents = await getDocuments()

		if (!documents) {
			return
		}

		setValue("uploads", [...documentList, ...documents])
	}

	const removeDocument = (doc: File) => {
		const oldDocuments = getValues("uploads") || []
		const index = oldDocuments.findIndex((d) => d.uri === doc.uri)

		const newDocuments = [...oldDocuments]
		newDocuments.splice(index, 1)

		setValue("uploads", [...newDocuments])
	}

	const handleOpenBottomSheet = () => {
		bottomSheetRef.current?.expand()
		Keyboard.dismiss()
	}

	return {
		control,
		isLoading: isUpdateLoading || isLoading,
		errors,
		handleCreateTask,
		handleSelectDate,
		openDatePicker,
		closeDatePicker,
		showDatePicker,
		deadLine: watch("deadLine"),
		subject: watch("subject"),
		navigateToSubjects,
		selectDocuments,
		documentList,
		removeDocument,
		isUpdate,
		bottomSheetRef,
		handleOpenBottomSheet,
	}
}
