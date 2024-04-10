import { UserType } from "@/modules/auth/models"

export type AuthStorageType = {
	updateUser: (user: UserType) => Promise<void>
	getUser: () => Promise<UserType | null>
	removeUser: () => Promise<void>
}
