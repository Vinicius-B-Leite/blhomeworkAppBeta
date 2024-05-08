import { storage } from "@/storage"
import { useEffect } from "react"

const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR
export const EXPIRATION_TIME = ONE_DAY * 5

export function useCacheControll() {
	const clearExpiredCache = async () => {
		const allKeys = await storage.getAllKeys()

		for (const key of allKeys) {
			const now = Date.now()
			const item = await storage.getItem<{ data: unknown; timestamp: number }>({
				key: undefined,
				customKey: key,
			})

			const timestamp = item?.timestamp

			if (!timestamp) {
				return
			}
			const cacheIsExpired = now - timestamp > EXPIRATION_TIME

			if (cacheIsExpired) {
				await storage.removeItem({
					key: undefined,
					customKey: JSON.stringify(key),
				})
			}
		}
	}
	useEffect(() => {
		clearExpiredCache()
	}, [])
}
