import { authService } from "../models/authService"
import { useMutation } from "@tanstack/react-query"

import { QUERY_KEYS } from "../api"

import { SingUpErrorreturn, getSupabeSingUpErrorMessage } from "@/modules/auth/utils"

type HandleSingupProps = Parameters<typeof authService.singUp>[0]

type UseSingUpProps = {
	onError?: (errorFormated: SingUpErrorreturn) => void
	onSucess?: () => void
}
export const useSingUpModelView = ({ onError, onSucess }: UseSingUpProps) => {
	const { data, isPending, mutate } = useMutation<void, Error, HandleSingupProps>({
		mutationKey: [QUERY_KEYS],
		mutationFn: (props) => handleSingUp(props),
		retry: false,
		gcTime: Infinity,
		onSuccess: () => {
			onSucess && onSucess()
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
