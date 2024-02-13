export type UserType = {
	avatarUrl?: string
	username: string
	email: string
	uid: string
	token: string
	refreshtoken: string
}

export type AuthResponse = {
	session: {
		access_token: string
		expires_at: number
		expires_in: number
		refresh_token: string
		token_type: string
		user: {
			app_metadata: {
				provider: string
				providers: []
			}
			aud: string
			created_at: string
			email: string
			email_confirmed_at: string
			id: string
			identities: [[]]
			last_sign_in_at: string
			phone: string
			role: string
			updated_at: string
			user_metadata: {
				username: string
			}
		}
	}
}
