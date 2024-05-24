import { supabase } from "@/api"
import { ProfileApi as ProfileApiType } from "./profileApiTypes"

export const profileApi: ProfileApiType = {
	updateProfile: async ({ username, avatarUrl, password, uid }) => {
		const [{ error: authError }, { data: userTableData, error: tableError }] =
			await Promise.all([
				supabase.auth.updateUser({
					password,
					data: {
						username,
						avatarUrl,
					},
				}),
				supabase
					.from("user")
					.update([
						{
							id: uid,
							user_name: username,
							avatar_url: avatarUrl,
						},
					])
					.eq("id", uid)
					.select(),
			])

		if (tableError) {
			throw new Error(tableError.message)
		}

		if (authError) {
			throw new Error(authError.message)
		}

		return userTableData?.[0]
	},
	refreshSeassion: async () => {
		const { data: user, error } = await supabase.auth.refreshSession()

		if (error || !user.session?.access_token || !user.session?.refresh_token) {
			throw new Error("Auth session missing!")
		}

		await supabase.auth.setSession({
			access_token: user.session?.access_token,
			refresh_token: user.session?.refresh_token,
		})
	},
}
