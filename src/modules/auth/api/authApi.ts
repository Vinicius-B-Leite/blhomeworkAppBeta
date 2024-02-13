import { supabase } from "@/api"
import { AuthApi } from "./authApiTypes"
import { AuthResponse } from "@/modules/auth/models"

export const authApi: AuthApi = {
	singUp: async ({ email, password, username, avatarUrl }) => {
		const response = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					avatarUrl: avatarUrl,
					username: username,
				},
			},
		})

		if (response.error) {
			throw new Error(response.error.message)
		}

		return response.data as unknown as AuthResponse
	},
}
