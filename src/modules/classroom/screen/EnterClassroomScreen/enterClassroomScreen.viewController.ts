import { useForm } from "react-hook-form"
import {
	EnterClassroomScreenSchema,
	enterClassroomScreenSchema,
} from "./enterClassroomScreenSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEnterClassroomModelView } from "@/modules/classroom/modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useEnterClassroomScreenViewController() {
	const {
		control,
		formState: { isValid },
		handleSubmit,
		setError,
	} = useForm<EnterClassroomScreenSchema>({
		resolver: zodResolver(enterClassroomScreenSchema),
		defaultValues: {
			code: "",
		},
	})
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()
	const { enterClassroom, isLoading } = useEnterClassroomModelView({
		onError: (error) => {
			const errorIsUnHandled = error === null
			if (errorIsUnHandled) {
				showToast({
					message: "Erro ao entrar na sala",
					type: "error",
				})
				return
			}
			setError("code", { message: error.message })
		},
		onSuccess: () => {
			showToast({
				message: "Você entrou na sala com sucesso!",
				type: "success",
			})
			navigation.goBack()
		},
	})

	const handleEnterClassroom = handleSubmit((data) => {
		enterClassroom({ classroomCode: data.code })
	})

	return {
		control,
		isValid,
		handleEnterClassroom,
		isLoading,
	}
}
