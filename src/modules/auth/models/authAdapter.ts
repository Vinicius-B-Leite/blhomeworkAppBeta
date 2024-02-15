import { AuthLoginResponse, AuthSingUpResponse, UserType } from "./authTypes"

const authSingupResponseToUser = (authResponse: AuthSingUpResponse): UserType => {
	return {
		avatarUrl: "",
		username: authResponse.session.user.user_metadata.username,
		email: authResponse.session.user.email,
		uid: authResponse.session.user.id,
		token: authResponse.session.access_token,
		refreshtoken: authResponse.session.refresh_token,
	}
}
const authLoginResponseToUser = (authResponse: AuthLoginResponse): UserType => {
	return {
		email: authResponse.user.email,
		refreshtoken: authResponse.session.refresh_token,
		token: authResponse.session.access_token,
		uid: authResponse.user.id,
		username: authResponse.user.user_metadata.username,
		avatarUrl: authResponse.user.user_metadata.avatarUrl,
	}
}
export const authAdapter = {
	authSingupResponseToUser,
	authLoginResponseToUser,
}
