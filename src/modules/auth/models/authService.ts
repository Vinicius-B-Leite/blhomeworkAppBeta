import { AuthResponse, UserType } from "./authTypes"
import { authAdapter } from "./authAdapter"
import { authApi } from "@/modules/auth/api"

export type SingUpProps = Pick<UserType, "email" | "avatarUrl" | "username"> & {
	password: string
}
const singUp = async (user: SingUpProps) => {
	try {
		const response = await authApi.singUp(user)
		return authAdapter.authResponseToUser(response)
	} catch (error) {
		throw error
	}
}

export const authService = {
	singUp,
}
