import { UserType } from "./authTypes"
import { authAdapter } from "./authAdapter"
import { LoginWithEmailProps, authApi } from "@/modules/auth/api"

export type SingUpProps = Pick<UserType, "email" | "avatarUrl" | "username"> & {
	password: string
}
const singUp = async (user: SingUpProps) => {
	try {
		const response = await authApi.singUp({
			...user,
			email: user.email.toLowerCase(),
		})
		return authAdapter.authSingupResponseToUser(response)
	} catch (error) {
		throw error
	}
}
const loginWithEmail = async ({ email, password }: LoginWithEmailProps) => {
	try {
		const response = await authApi.loginWithEmail({
			email: email.toLowerCase(),
			password,
		})
		return authAdapter.authLoginResponseToUser(response)
	} catch (error) {
		throw error
	}
}

const resetPasswordsForEmail = async (email: string) => {
	try {
		await authApi.sendEmailToResetPassword(email.toLowerCase())
	} catch (error) {
		throw error
	}
}

export const authService = {
	singUp,
	loginWithEmail,
	resetPasswordsForEmail,
}
