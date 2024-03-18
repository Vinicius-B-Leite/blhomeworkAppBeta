import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskScreenSchema, createTaskScreenSchema } from "./createTaskScreenSchema"
import { useState } from "react"
import { Subject } from "../../model"
import { useNavigation } from "@react-navigation/native"

export function useCreateTaskViewController() {
	const {
		control,
		formState: { isValid, errors },
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

	const handleCreateTask = handleSubmit((data) => {
		console.log(data)
	})
	console.log(errors)

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
			},
		})
	}
	return {
		control,
		isValid,
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
