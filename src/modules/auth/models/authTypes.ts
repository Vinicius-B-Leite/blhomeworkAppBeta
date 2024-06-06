export type UserType = {
	avatarUrl?: string | null
	username: string
	email: string
	uid: string
	token: string
	refreshtoken: string
}

export type AuthTableResponde = {
	avatar_url: string | null | undefined
	email: string
	id: string
	user_name: string
}

type AuthUserResponse = {
	app_metadata: {
		provider: string
		providers: string[]
	}
	aud: string
	confirmed_at: string
	created_at: string
	email: string
	email_confirmed_at: string
	id: string
	identities: string[][]
	last_sign_in_at: string
	phone: string
	role: string
	updated_at: string
	user_metadata: {
		username: string
		avatarUrl: string | null
	}
}
type AuthSession = {
	access_token: string
	expires_at: number
	expires_in: number
	refresh_token: string
	token_type: string
	user: AuthUserResponse
}

export type AuthSingUpResponse = {
	session: AuthSession
}

export type AuthLoginResponse = {
	session: AuthSession
	user: AuthUserResponse
}
