import { supabase } from "@/api"
import { ProfileApi as ProfileApiType } from "./profileApiTypes"

export const profileApi: ProfileApiType = {
	updateProfile: async ({ username, avatarUrl, password, uid, notificationToken }) => {
		const [authResponse, { data: userTableData, error: tableError }] =
			await Promise.all([
				username || avatarUrl
					? supabase.auth.updateUser({
							password,
							data: {
								username,
								avatarUrl,
							},
					  })
					: undefined,
				supabase
					.from("user")
					.update([
						{
							id: uid,
							user_name: username,
							avatar_url: avatarUrl,
							notification_token: notificationToken,
						},
					])
					.eq("id", uid)
					.select(),
			])

		if (tableError) {
			throw new Error(tableError.message)
		}

		if (authResponse?.error?.message) {
			throw new Error(authResponse?.error?.message)
		}

		return userTableData?.[0]
	},
	refreshSeassion: async (refreshToken) => {
		const { data: user, error } = await supabase.auth.refreshSession({
			refresh_token: refreshToken,
		})

		if (error || !user.session?.access_token || !user.session?.refresh_token) {
			throw new Error("Auth session missing!")
		}

		await supabase.auth.setSession({
			access_token: user.session?.access_token,
			refresh_token: user.session?.refresh_token,
		})
	},
}
