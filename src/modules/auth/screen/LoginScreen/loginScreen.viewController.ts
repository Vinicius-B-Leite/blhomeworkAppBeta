import { FieldErrors, UseControllerProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginScreenSchema, loginScreenSchema } from "./loginScreenSchema"
import { useNavigation } from "@react-navigation/native"

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
	const {
		control,
		handleSubmit: formHandleSubmit,
		formState: { errors, isValid, isLoading },
	} = useForm<LoginScreenSchema>({
		resolver: zodResolver(loginScreenSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	})

	const handleSubmit = (data: LoginScreenSchema) => {
		console.log(data)
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
