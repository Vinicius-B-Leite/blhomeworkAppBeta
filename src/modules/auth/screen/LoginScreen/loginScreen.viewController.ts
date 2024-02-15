import { FieldErrors, UseControllerProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginScreenSchema, loginScreenSchema } from "./loginScreenSchema"
import { useNavigation } from "@react-navigation/native"
import { useLoginWithEmail } from "../../modelView"
import { useToastDispatch } from "@/store"

type LoginScreenViewController = {
	submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
	error: FieldErrors<LoginScreenSchema>
	isLoading: boolean
	isValid: boolean
	control: UseControllerProps<LoginScreenSchema>["control"]
	navigateToSignUp: () => void
}

export const useLoginScreenViewController = (): LoginScreenViewController => {
	const navigation = useNavigation()
	const { showToast } = useToastDispatch()
	const { loginWithEmail, isLoading } = useLoginWithEmail({
		onError: (error) => {
			if (error === null) {
				showToast({ message: "Error ao realizar login!", type: "error" })
				return
			}
			error.field.forEach((field) => {
				setError(field, { message: error.message })
			})
		},
	})
	const {
		control,
		handleSubmit: formHandleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<LoginScreenSchema>({
		resolver: zodResolver(loginScreenSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	})

	const handleSubmit = (data: LoginScreenSchema) => {
		loginWithEmail({ email: data.email, password: data.password })
	}
	return {
		submit: formHandleSubmit(handleSubmit),
		error: errors,
		isLoading: isLoading,
		isValid: isValid,
		control,
		navigateToSignUp: () => navigation.navigate("SingUpScreen"),
	}
}
