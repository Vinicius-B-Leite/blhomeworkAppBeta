import { api } from "@/api"
import { profileApi } from "../api/profileApi"
import { UpdatedProfileApiProps } from "../api/profileApiTypes"
import { getExtension } from "@/utils"
import { mimeTypes } from "@/constant"
import { profileAdapert } from "./profileAdapter"

const updateProfile = async (
	props: UpdatedProfileApiProps & {
		uid: string
		base64?: string
		shouldRefreshSession?: boolean
		refreshToken: string
	}
) => {
	try {
		if (props.shouldRefreshSession) {
			await profileApi.refreshSeassion(props.refreshToken)
		}
		let avatarUrl = props.avatarUrl

		const changedAvatar = !avatarUrl?.includes("http")
		if (avatarUrl && changedAvatar && props.base64) {
			const listFilesResponse = await api.listFilesFromFolder({
				bucketName: "avatars",
				folder: props.uid,
			})

			if (listFilesResponse?.length) {
				const filesToDelete = listFilesResponse.map(
					(file) => `${props.uid}/${file.name}`
				)

				await api.removeFiles({
					bucketName: "avatars",
					filesPath: filesToDelete,
				})
			}

			const { downloadUrl } = await api.uploadFile({
				base64: props.base64,
				bucketName: "avatars",
				contentType: getExtension(avatarUrl).split(
					"."
				)[1] as keyof typeof mimeTypes,
				uri: avatarUrl,
				folder: props.uid,
			})
			avatarUrl = downloadUrl
		}

		const updatedMetadadosUser = await profileApi.updateProfile({
			avatarUrl,
			password: props.password,
			uid: props.uid,
			username: props.username,
			notificationToken: props.notificationToken,
		})

		return profileAdapert.toUser(updatedMetadadosUser)
	} catch (error) {
		throw error
	}
}

export const profileService = { updateProfile }
