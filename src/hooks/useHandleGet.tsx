import { storage } from "@/storage"
import { saveDataInStorageWithTimestamp } from "@/utils"
import { useNetInfo } from "@react-native-community/netinfo"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

type UseHandleGetProps<ReturnDataType> = {
	getFn: () => Promise<ReturnDataType>
	queryKey: Array<string | number | boolean | null | undefined>
	enabled?: boolean
	onError?: (message: string) => void
	onSuccess?: (data: ReturnDataType) => void
}
export function useHandleGet<ReturnDataType>({
	getFn,
	queryKey,
	enabled = true,
	onError,
	onSuccess,
}: UseHandleGetProps<ReturnDataType>) {
	let { isConnected } = useNetInfo()

	const isfethingNetinfo = isConnected === null

	const { data, error, refetch, isFetching, isSuccess } = useQuery<
		ReturnDataType | null,
		Error
	>({
		queryKey: queryKey,
		queryFn: () => handleGetData(),
		enabled: enabled && !isfethingNetinfo,
	})

	const handleGetData = async () => {
		if (isConnected) {
			const response = await getFn()
			return response
		}

		const cache = await storage.getItem<{ data: ReturnDataType }, string>({
			key: undefined,
			customKey: JSON.stringify(queryKey),
		})

		if (cache) {
			return cache.data
		}
		return null
	}

	useEffect(() => {
		if (isSuccess && isConnected && data) {
			saveDataInStorageWithTimestamp(data, queryKey)
		}
	}, [isSuccess, data, isConnected])

	useEffect(() => {
		if (error) {
			onError?.(error.message)
		}
	}, [error])

	useEffect(() => {
		if (isSuccess && data) {
			onSuccess?.(data)
		}
	}, [isSuccess, data])

	return {
		data: data ?? null,
		isLoading: isFetching,
		refresh: refetch,
	}
}
