import { AuthLoginResponse, UserType } from "@/modules/auth/models"

const user: UserType = {
	email: "fake-email@gmail.com",
	refreshtoken: "fake-resfresh-token",
	token: "fake-token",
	uid: "fake-uid",
	username: "fake-username",
	avatarUrl: null,
}

export const loginMock: AuthLoginResponse = {
	session: {
		access_token: user.token,
		expires_at: 123123123,
		expires_in: 123123123,
		refresh_token: user.refreshtoken,
		token_type: "fake-token",
		//@ts-ignore
		user: {
			user_metadata: {
				username: user.username,
				avatarUrl: null,
			},
			email: user.email,
			id: user.uid,
		},
	},
	user: {
		app_metadata: {
			provider: "email",
			providers: ["email"],
		},
		aud: "fake-aud",
		confirmed_at: "fake-confirmed-at",
		created_at: "fake-created-at",
		email: user.email,
		email_confirmed_at: "fake-email-confirmed-at",
		id: user.uid,
		identities: [],
		last_sign_in_at: "fake-last-sign-in-at",
		phone: "fake-phone",
		role: "fake-role",
		updated_at: "fake-up",
		user_metadata: {
			avatarUrl: null,
			username: user.username,
		},
	},
}

export const mocks = {
	user,
	loginMock,
}
