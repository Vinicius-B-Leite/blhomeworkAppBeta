import { supabase } from "@/api"
import { AuthApi } from "./authApiTypes"
import { AuthLoginResponse, AuthSingUpResponse } from "@/modules/auth/models"

export const authApi: AuthApi = {
	singUp: async ({ email, password, username, avatarUrl }) => {
		const response = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					avatarUrl: avatarUrl ? avatarUrl : null,
					username: username,
				},
			},
		})

		if (response.error) {
			throw new Error(response.error.message)
		}

		return response.data as unknown as AuthSingUpResponse
	},
	loginWithEmail: async ({ email, password }) => {
		const response = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})

		if (response.error) {
			throw new Error(response.error.message)
		}

		return response.data as unknown as AuthLoginResponse
	},
	sendEmailToResetPassword: async (email: string) => {
		const response = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo:
				"https://65d3b1a89e9f6b24125002b8--kaleidoscopic-strudel-e34d3b.netlify.app",
		})

		if (response.error) {
			throw new Error(response.error.message)
		}

		return
	},
}
