import { AuthResponse, UserType } from "./authTypes"

const authResponseToUser = (authResponse: AuthResponse): UserType => {
	return {
		avatarUrl: "",
		username: authResponse.session.user.user_metadata.username,
		email: authResponse.session.user.email,
		uid: authResponse.session.user.id,
		token: authResponse.session.access_token,
		refreshtoken: authResponse.session.refresh_token,
	}
}

export const authAdapter = {
	authResponseToUser,
}
