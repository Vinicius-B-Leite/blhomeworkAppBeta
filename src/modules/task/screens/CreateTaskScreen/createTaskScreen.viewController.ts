import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskScreenSchema, createTaskScreenSchema } from "./createTaskScreenSchema"
import { useState } from "react"
import { Subject, Upload } from "@/modules/task/model"
import { useNavigation } from "@react-navigation/native"
import { useRouteParams } from "@/hooks"
import { useCreateTask } from "@/modules/task/modelView"
import { useToastDispatch } from "@/store"
import { getDocuments } from "@/modules/task/utils"

export function useCreateTaskViewController() {
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
			title: "",
			description: "",
		},
		mode: "onSubmit",
	})
	const navigation = useNavigation()
	const [showDatePicker, setShowDatePicker] = useState(false)
	const params = useRouteParams("CreateSubject")
	const documentList = watch("uploads") ?? []
	const { showToast } = useToastDispatch()
	const { createTaskt, isLoading } = useCreateTask({
		classroomId: params!.classroomId,
		onError: () => {
			showToast({ message: "Erro ao criar tarefa!", type: "error" })
		},
	})

	const handleCreateTask = handleSubmit((data) => {
		createTaskt({
			classroomId: params!.classroomId,
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
				classroomId: params!.classroomId,
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

	const removeDocument = (doc: Upload) => {
		const oldDocuments = getValues("uploads") || []
		const index = oldDocuments.indexOf(doc)
		const newDocuments = [...oldDocuments]
		newDocuments.splice(index, 1)

		setValue("uploads", [...newDocuments])
	}
	return {
		control,
		isLoading,
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
	}
}
