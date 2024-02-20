import AsyncStorage from "@react-native-async-storage/async-storage"
import { StorageType } from "./storageType"

const StorageInstand = AsyncStorage

export const storage: StorageType = {
	getItem: async (key) => {
		const item = await StorageInstand.getItem(key)
		return item ? JSON.parse(item) : null
	},
	setItem: async (key, value) => {
		await StorageInstand.setItem(key, JSON.stringify(value))
	},
	removeItem: async (key) => {
		await StorageInstand.removeItem(key)
	},
}
