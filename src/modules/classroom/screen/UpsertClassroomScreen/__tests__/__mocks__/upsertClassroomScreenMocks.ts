import { UserType } from "@/modules/auth/models"

const user: UserType = {
	avatarUrl: "url_avatar",
	username: "example_user",
	email: "example@example.com",
	uid: "123456",
	token: "token_string",
	refreshtoken: "refresh_token_string",
}

export const mocks = {
	user,
}
