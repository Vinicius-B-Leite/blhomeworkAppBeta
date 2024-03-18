import { useForm } from "react-hook-form"
import { CreateSubjectSchema, createSubjectSchema } from "./createSubjectSchema"
import { zodResolver } from "@hookform/resolvers/zod"

export function useCreateSubjectScreenViewController() {
	const {
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<CreateSubjectSchema>({
		resolver: zodResolver(createSubjectSchema),
		defaultValues: {
			color: "#ff0000",
			name: "",
			shortName: "",
		},
	})

	const onSelectColor = ({ hex }: { hex: string }) => {
		setValue("color", hex)
	}

	const handleCreateSubject = handleSubmit((data) => {
		console.log(data)
	})
	return {
		onSelectColor,
		selectedColor: watch("color"),
		subjectName: watch("name"),
		shortName: watch("shortName"),
		control,
		handleCreateSubject,
		errors,
	}
}
