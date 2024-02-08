import { FieldErrors, UseControllerProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigation } from "@react-navigation/native"
import { SingupScreenSchema, singupScreenSchema } from "./singupScreenSchema"

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
	const {
		control,
		handleSubmit: formHandleSubmit,
		formState: { errors, isValid, isLoading },
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

	const handleSubmit = (data: SingupScreenSchema) => {
		console.log(data)
	}
	return {
		submit: formHandleSubmit(handleSubmit),
		error: errors,
		isLoading: isLoading,
		isValid: isValid,
		control,
		goBackToLogin: () => navigation.goBack(),
	}
}
