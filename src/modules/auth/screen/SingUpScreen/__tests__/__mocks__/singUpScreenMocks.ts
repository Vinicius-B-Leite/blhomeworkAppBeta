import { UserType } from "@/modules/auth/models/authTypes"

const user: UserType & { password: string } = {
	username: "someone",
	email: "someone@gmail.com",
	password: "123456",
	refreshtoken: "refresh",
	token: "token",
	uid: "123",
}

export const mocks = {
	user,
}
