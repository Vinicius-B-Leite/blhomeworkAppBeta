import { storage } from "@/storage"
import { AuthStorageType } from "./authStorageType"
import { UserType } from "../models"

export const authStorage: AuthStorageType = {
	updateUser: async (user) => {
		await storage.setItem("auth", user)
	},
	getUser: async () => {
		return await storage.getItem<UserType>({ key: "auth" })
	},
	removeUser: async () => {
		await storage.removeItem({ key: "auth" })
	},
}
