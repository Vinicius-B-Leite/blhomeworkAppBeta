import { supabase } from "@/api"
import { AuthResponse, UserType } from "./authTypes"
import { authAdapter } from "./authAdapter"

export type SingUpProps = Pick<UserType, "email" | "avatarUrl" | "username"> & {
	password: string
}
const singUp = async (user: SingUpProps) => {
	const response = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				avatarUrl: user.avatarUrl,
				username: user.username,
			},
		},
	})

	if (response.error) {
		throw new Error(response.error.message)
	}

	return response.data as unknown as AuthResponse
}

export const authService = {
	singUp,
}
