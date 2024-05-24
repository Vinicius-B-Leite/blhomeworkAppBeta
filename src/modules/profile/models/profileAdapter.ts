import { UserType } from "@/modules/auth/models"
import { UserUpdatedReturn, UserUpdatedTableRespnse } from "./profileTypes"

const toUser = (userUpdatedTableResponse: UserUpdatedTableRespnse): UserUpdatedReturn => {
	return {
		email: userUpdatedTableResponse.email,
		username: userUpdatedTableResponse.user_name,
		avatarUrl: userUpdatedTableResponse.avatar_url,
	}
}

export const profileAdapert = {
	toUser,
}
