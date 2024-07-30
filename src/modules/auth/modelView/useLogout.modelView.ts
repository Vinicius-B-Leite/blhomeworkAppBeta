import { authService } from "@/modules/auth/models"
import { useMutation } from "@tanstack/react-query"

import { CoumnModelViewProps } from "@/types"
import { useAuth } from "@/modules/auth/context"

import { cancelAllScheduledNotifications } from "@/service/notifications"
import { useNavigation } from "@react-navigation/native"

export const useLogoutModelView = (
	props?: Omit<CoumnModelViewProps<void, void>, "onError">
) => {
	const { logout } = useAuth()
	const navigation = useNavigation()
	const onSuccess = props?.onSuccess

	const { isPending, mutate } = useMutation<void, Error, void>({
		mutationFn: () => handleSingUp(),
		retry: false,
		gcTime: Infinity,
		onSuccess: async () => {
			onSuccess && onSuccess()
			navigation.reset(navigation.getState())
			await cancelAllScheduledNotifications()
		},
	})

	const handleSingUp = async () => {
		await logout()
		await authService.logout()
	}

	return { logout: mutate, isPending }
}
