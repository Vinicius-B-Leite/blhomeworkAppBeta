import { useMutation } from "@tanstack/react-query"
import { authService } from "@/modules/auth/models"
import { AUTH_QUERY_KEYS } from "@/modules/auth/api"
import { SubapaseAuthError, getSubapaseAuthError } from "@/modules/auth/utils"
import { CoumnModelViewProps } from "@/types"

type UseResetPasswordModelViewProps = CoumnModelViewProps<SubapaseAuthError, void>
export const useResetPasswordModelView = (props?: UseResetPasswordModelViewProps) => {
	const { mutate, isPending } = useMutation<void, Error, { email: string }>({
		mutationKey: [AUTH_QUERY_KEYS.RESET_PASSWORD],
		mutationFn: ({ email }) => authService.resetPasswordsForEmail(email),
		gcTime: Infinity,
		retry: false,
		onError: (error) => {
			const errorMessage = getSubapaseAuthError(error.message)
			props?.onError && props.onError(errorMessage)
		},
		onSuccess: () => {
			props?.onSuccess && props.onSuccess()
		},
	})

	return {
		resetPassword: mutate,
		isPending,
	}
}
