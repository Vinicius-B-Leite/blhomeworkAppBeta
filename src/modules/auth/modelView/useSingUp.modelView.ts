import { authService } from "@/modules/auth/models"
import { useMutation } from "@tanstack/react-query"

import { AUTH_QUERY_KEYS } from "@/modules/auth/api"

import { SubapaseAuthError, getSubapaseAuthError } from "@/modules/auth/utils"

import { CoumnModelViewProps } from "@/types"

type HandleSingupProps = Parameters<typeof authService.singUp>[0]

export const useSingUpModelView = (
	props?: CoumnModelViewProps<SubapaseAuthError, void>
) => {
	const onSuccess = props?.onSuccess
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
			const errorFormated = getSubapaseAuthError(error.message)

			onError && onError(errorFormated)
		},
	})

	const handleSingUp = async (props: HandleSingupProps) => {
		await authService.singUp(props)
	}

	return { handleSingUp: mutate, data, isPending }
}
