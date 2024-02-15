import { UserType } from "../models"

export type AuthStorageType = {
	updateUser: (user: UserType) => Promise<void>
	getUser: () => Promise<UserType | null>
}
