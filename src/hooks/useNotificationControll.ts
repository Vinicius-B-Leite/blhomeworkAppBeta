import { useAuth } from "@/modules/auth/context"
import { profileService } from "@/modules/profile/models/profileService"
import { getToken } from "@/service/notifications"
import { storage } from "@/storage"
import { useEffect } from "react"

export function useNotificationControll() {
	const { user } = useAuth()

	const saveToken = async (token: string) => {
		if (!user?.uid) return

		await storage.setItem("notificationToken", token)
		await profileService.updateProfile({
			notificationToken: token,
			uid: user.uid,
			shouldRefreshSession: false,
		})
	}

	const getExpoNotificationToken = async () => {
		const expoToken = await getToken()
		const storageToken = await storage.getItem({
			key: "notificationToken",
		})

		if (expoToken !== storageToken) {
			saveToken(expoToken)
		}
	}

	useEffect(() => {
		getExpoNotificationToken()
	}, [user])
}
