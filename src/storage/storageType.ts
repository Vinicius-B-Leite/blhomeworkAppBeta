import { AUTH_STORAGE_KEY } from "@/modules/auth/storage"

const KEYS = {
	auth: AUTH_STORAGE_KEY,
}

export type StorageKeys = keyof typeof KEYS

export type StorageType = {
	getItem: <T>(key: StorageKeys) => Promise<T | null>
	setItem: <T>(key: StorageKeys, value: T) => Promise<void>
	removeItem: (key: StorageKeys) => Promise<void>
}
