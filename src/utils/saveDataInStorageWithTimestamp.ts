import { storage } from "@/storage"

export function saveDataInStorageWithTimestamp<T>(
	data: T,
	queryKey: (string | number | boolean | null | undefined)[]
) {
	const timestamp = Date.now()
	storage.setItem(JSON.stringify(queryKey), { data, timestamp })
}
