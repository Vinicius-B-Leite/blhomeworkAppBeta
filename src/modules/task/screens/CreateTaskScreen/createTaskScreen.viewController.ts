import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskScreenSchema, createTaskScreenSchema } from "./createTaskScreenSchema"
import { useState } from "react"
import { Subject } from "../../model"
import { useNavigation } from "@react-navigation/native"
import { useRouteParams } from "@/hooks"
import { useCreateTask } from "../../modelView"
import { useToastDispatch } from "@/store"

export function useCreateTaskViewController() {
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
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
	}
}
