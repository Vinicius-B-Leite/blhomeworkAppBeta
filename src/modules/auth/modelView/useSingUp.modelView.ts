import { authService } from "@/modules/auth/models/authService"
import { useMutation } from "@tanstack/react-query"

import { AUTH_QUERY_KEYS } from "@/modules/auth/api"

import { SingUpErrorreturn, getSupabeSingUpErrorMessage } from "@/modules/auth/utils"

type HandleSingupProps = Parameters<typeof authService.singUp>[0]

type UseSingUpProps = {
	onError?: (errorFormated: SingUpErrorreturn) => void
	onSucess?: () => void
}
export const useSingUpModelView = (props?: UseSingUpProps) => {
	const onSuccess = props?.onSucess
	const onError = props?.onError

	const { data, isPending, mutate } = useMutation<void, Error, HandleSingupProps>({
		mutationKey: [AUTH_QUERY_KEYS],
		mutationFn: (props) => handleSingUp(props),
		retry: false,
		gcTime: Infinity,
		onSuccess: () => {
			onSuccess && onSuccess()
		},
		onError: (error) => {
			const errorFormated = getSupabeSingUpErrorMessage(error.message)

			onError && onError(errorFormated)
		},
	})

	const handleSingUp = async (props: HandleSingupProps) => {
		await authService.singUp(props)
	}

	return { handleSingUp: mutate, data, isPending }
}
