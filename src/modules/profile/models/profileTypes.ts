import { UserType } from "@/modules/auth/models"

export type UserUpdatedTableRespnse = {
	avatar_url: string
	email: string
	id: string
	user_name: string
}

export type UserUpdatedReturn = Pick<UserType, "avatarUrl" | "email" | "username">
