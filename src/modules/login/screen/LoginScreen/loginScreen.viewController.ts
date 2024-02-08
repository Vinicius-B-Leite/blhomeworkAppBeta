import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginScreenSchema, loginScreenSchema } from "./loginScreenSchema"

export const useLoginScreenViewController = () => {
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
	}
}
