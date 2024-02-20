import { useRouteParams } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ForgetPasswordScreenSchema } from "./forgetPasswordScreenSchema"

import { useResetPasswordModelView } from "@/modules/auth/modelView"
import { useToastDispatch } from "@/store"

export const useForgetPasswordViewController = () => {
	const email = useRouteParams("ForgetPasswordScreen")?.email
	const { showToast } = useToastDispatch()

	const { isPending, resetPassword } = useResetPasswordModelView({
		onError: (error) => {
			const errorMessage = error?.message || "Algo deu errado. Tente novamente."
			showToast({ message: errorMessage, type: "error" })
		},
		onSuccess: () => {
			showToast({ message: "E-mail enviado com sucesso", type: "success" })
			reset()
		},
	})
	const {
		control,
		handleSubmit,
		formState: { isValid },
		reset,
	} = useForm<ForgetPasswordScreenSchema>({
		resolver: zodResolver(ForgetPasswordScreenSchema),
		defaultValues: {
			email: email,
		},
		mode: "onChange",
	})

	const onSubmit = async (data: ForgetPasswordScreenSchema) => {
		resetPassword({ email: data.email })
	}

	return {
		control,
		isValid,
		handleSubmit: handleSubmit(onSubmit),
		isLoading: isPending,
	}
}
