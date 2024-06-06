import {
	SingUpProps,
	AuthLoginResponse,
	AuthSingUpResponse,
	UserType,
	AuthTableResponde,
} from "@/modules/auth/models"

export type LoginWithEmailProps = {
	email: string
	password: string
}

export type AuthApi = {
	singUp: (props: SingUpProps) => Promise<AuthSingUpResponse>
	loginWithEmail: (props: LoginWithEmailProps) => Promise<AuthLoginResponse>
	sendEmailToResetPassword: (email: string) => Promise<void>
	singOut: () => Promise<void>
	insertUserTable: (
		user: Pick<UserType, "uid" | "email" | "username" | "avatarUrl">
	) => Promise<void>
	getUserData: (uid: string) => Promise<AuthTableResponde>
}
