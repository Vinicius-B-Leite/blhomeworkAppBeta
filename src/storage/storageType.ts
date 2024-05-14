import { THEME_STORAGE_KEY } from "@/contextsProviders"
import { AUTH_STORAGE_KEY } from "@/modules/auth/storage"

const KEYS = {
	auth: AUTH_STORAGE_KEY,
	theme: THEME_STORAGE_KEY,
}

export type StorageKeys = keyof typeof KEYS

type CustomKeyProp<K = string> =
	| {
			key: StorageKeys
			customKey?: false
	  }
	| {
			key: false | null | undefined
			customKey: K
	  }
export type StorageType = {
	getItem: <T, K = unknown>(props: CustomKeyProp<K>) => Promise<T | null>
	getAllKeys: () => Promise<readonly string[]>
	unTypedGetItem: (key: string) => Promise<any>
	setItem: <T>(key: StorageKeys | string, value: T) => Promise<void>
	removeItem: (key: CustomKeyProp) => Promise<void>
	removeAll: () => Promise<void>
}
