import { useMutation } from "@tanstack/react-query"
import { AUTH_QUERY_KEYS, LoginWithEmailProps } from "@/modules/auth/api"
import { UserType, authService } from "@/modules/auth/models"
import { CoumnModelViewProps } from "@/types"
import { SubapaseAuthError, getSubapaseAuthError } from "@/modules/auth/utils"
import { useAuth } from "@/modules/auth/context"

export function useLoginWithEmail(
	props?: CoumnModelViewProps<SubapaseAuthError, UserType>
) {
	const { updateUser } = useAuth()
	const { mutate, isPending } = useMutation<UserType, Error, LoginWithEmailProps>({
		mutationKey: [AUTH_QUERY_KEYS.LOGIN_WITH_EMAIL],
		mutationFn: ({ email, password }) =>
			authService.loginWithEmail({ email, password }),
		retry: false,
		gcTime: Infinity,
		onSuccess: async (data) => {
			await updateUser(data)
			props?.onSuccess && props.onSuccess(data)
		},
		onError: (error) => {
			const errorFormated = getSubapaseAuthError(error.message)
			props?.onError && props.onError(errorFormated)
		},
	})

	return {
		loginWithEmail: mutate,
		isLoading: isPending,
	}
}
