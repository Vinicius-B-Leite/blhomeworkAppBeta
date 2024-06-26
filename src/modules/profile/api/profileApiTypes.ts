import { UserType } from "@/modules/auth/models"
import { UserUpdatedTableRespnse } from "../models/profileTypes"

export type UpdatedProfileApiProps = Partial<
	Omit<UserType, "token" | "refreshtoken" | "email"> & {
		password: string
	}
>
export type ProfileApi = {
	updateProfile: (profile: UpdatedProfileApiProps) => Promise<UserUpdatedTableRespnse>
	refreshSeassion: () => Promise<void>
}
