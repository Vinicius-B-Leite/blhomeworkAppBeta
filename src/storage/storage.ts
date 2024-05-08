import AsyncStorage from "@react-native-async-storage/async-storage"
import { StorageType } from "./storageType"

const StorageInstand = AsyncStorage

export const storage: StorageType = {
	/**
	 * @warning getItem custom key prop - Use it only if you are sure about the key.
	 */
	getItem: async ({ key, customKey }) => {
		let storageKey = ""
		if (key) {
			storageKey = key
		}
		if (customKey) {
			storageKey = customKey as string
		}
		const item = await StorageInstand.getItem(storageKey)
		return item ? JSON.parse(item) : null
	},
	setItem: async (key, value) => {
		await StorageInstand.setItem(key, JSON.stringify(value))
	},
	removeItem: async ({ key, customKey }) => {
		let storageKey = ""
		if (key) {
			storageKey = key
		}
		if (customKey) {
			storageKey = customKey as string
		}
		await StorageInstand.removeItem(storageKey)
	},
	unTypedGetItem: async (key) => {
		const item = await StorageInstand.getItem(key)
		return item ? JSON.parse(item) : null
	},
	getAllKeys: async () => {
		const allItens = await StorageInstand.getAllKeys()
		return allItens
	},
	removeAll: async () => {
		await StorageInstand.clear()
	},
}
