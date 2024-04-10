import { storage } from "@/storage"
import { AuthStorageType } from "./authStorageType"

export const authStorage: AuthStorageType = {
	updateUser: async (user) => {
		await storage.setItem("auth", user)
	},
	getUser: async () => {
		return await storage.getItem("auth")
	},
	removeUser: async () => {
		await storage.removeItem("auth")
	},
}
