import { useMutation } from "@tanstack/react-query"
import { PROFILE_KEYS } from "../api"
import { profileService } from "../models/profileService"
import { useAuth } from "@/modules/auth/context"
import { CoumnModelViewProps } from "@/types"
import {
	SubapaseProfileError,
	authenticate,
	canUseLocalAuthentication,
	getSubapaseProfileError,
} from "@/modules/profile/utils"
import { UserUpdatedReturn } from "../models/profileTypes"

type MutateProps = Omit<Parameters<typeof profileService.updateProfile>[0], "uid"> & {
	base64?: string
}

type UseUpdateProfileModelViewProps = CoumnModelViewProps<SubapaseProfileError, void>

export function useUpdateProfileModelView(props: UseUpdateProfileModelViewProps) {
	const { user, updateUser } = useAuth()

	const handleUpdateProfile = async (p: MutateProps) => {
		let localAutheticationSuccess = false
		const localAutheticationAvalibel = await canUseLocalAuthentication()

		if (localAutheticationAvalibel) {
			const authenticateStatus = await authenticate()

			if (!authenticateStatus.success) {
				throw new Error("Local authentication failed")
			}
			localAutheticationSuccess = true
		}

		const updateProfile = await profileService.updateProfile({
			uid: user!.uid,
			shouldRefreshSession: localAutheticationSuccess,
			...p,
		})

		return updateProfile
	}

	const { isPending, mutate } = useMutation<UserUpdatedReturn, Error, MutateProps>({
		mutationFn: (p) => handleUpdateProfile(p),

		onSuccess: (updatedUser) => {
			props?.onSuccess?.()
			updateUser({
				email: updatedUser.email,
				username: updatedUser.username,
				avatarUrl: updatedUser.avatarUrl,
				refreshtoken: user!.refreshtoken,
				token: user!.token,
				uid: user!.uid,
			})
		},
		onError: (error) => {
			const handlerError = getSubapaseProfileError(error.message)

			props?.onError?.(handlerError)
		},
		mutationKey: [PROFILE_KEYS.UPDATE_PROFILE],
		retry: false,
		gcTime: Infinity,
	})

	return {
		isPending,
		updateProfile: mutate,
	}
}
