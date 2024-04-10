import { authService } from "@/modules/auth/models"
import { useMutation } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"

export const useLogoutModelView = (
	props?: Omit<CoumnModelViewProps<void, void>, "onError">
) => {
	const { logout } = useAuth()
	const onSuccess = props?.onSuccess

	const { isPending, mutate } = useMutation<void, Error, void>({
		mutationFn: () => handleSingUp(),
		retry: false,
		gcTime: Infinity,
		onSuccess: () => {
			onSuccess && onSuccess()
		},
	})

	const handleSingUp = async () => {
		await logout()
		await authService.logout()
	}

	return { logout: mutate, isPending }
}
