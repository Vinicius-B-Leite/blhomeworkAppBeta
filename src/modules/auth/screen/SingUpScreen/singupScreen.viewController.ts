import { FieldErrors, UseControllerProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigation } from "@react-navigation/native"
import { SingupScreenSchema, singupScreenSchema } from "./singupScreenSchema"
import { useSingUpModelView } from "@/modules/auth/modelView"

import { useToastDispatch } from "@/store"

type LoginScreenViewController = {
	submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
	error: FieldErrors<SingupScreenSchema>
	isLoading: boolean
	isValid: boolean
	control: UseControllerProps<SingupScreenSchema>["control"]
	goBackToLogin: () => void
}

export const useSingUpScreenViewController = (): LoginScreenViewController => {
	const navigation = useNavigation()
	const { showToast } = useToastDispatch()

	const {
		control,
		handleSubmit: formHandleSubmit,
		formState: { errors, isValid },
		setError,
	} = useForm<SingupScreenSchema>({
		resolver: zodResolver(singupScreenSchema),
		defaultValues: {
			username: "",
			email: "",
			passwords: {
				password: "",
				confirmPassword: "",
			},
		},
		mode: "onChange",
	})

	const { handleSingUp, isPending } = useSingUpModelView({
		onError: (errorFormated) => {
			if (!errorFormated) {
				showToast({ type: "error", message: "Erro ao realizar cadastro!" })
				return
			}
			errorFormated.field.forEach((field) => {
				setError(field === "password" ? "passwords.password" : field, {
					message: errorFormated.message,
				})
			})
		},
		onSuccess: () => {
			showToast({ type: "success", message: "Cadastro realizado com sucesso" })
			navigation.goBack()
		},
	})

	const handleSubmit = async (data: SingupScreenSchema) => {
		handleSingUp({
			email: data.email,
			password: data.passwords.password,
			username: data.username,
		})
	}

	return {
		submit: formHandleSubmit(handleSubmit),
		error: errors,
		isLoading: isPending,
		isValid: isValid,
		control,
		goBackToLogin: () => navigation.goBack(),
	}
}
