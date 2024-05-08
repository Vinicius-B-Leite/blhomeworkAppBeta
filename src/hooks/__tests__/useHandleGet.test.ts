import { storage } from "@/storage"
import { useHandleGet } from "../useHandleGet"
import { waitFor, renderHook } from "@/testUtils"

describe("hooks: useHandleGet", () => {
	it("should call onError when there is an error", async () => {
		jest.spyOn(storage, "getItem").mockResolvedValue(null)

		const getFn = jest.fn().mockRejectedValue(new Error("error"))
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useHandleGet({
				getFn: () => getFn(),
				queryKey: ["test"],
				enabled: true,
				onError,
			})
		)

		await waitFor(() => {
			expect(onError).toHaveBeenCalledWith("error")
			expect(result.current.data).toEqual(null)
		})
	})
	it("should save on cache when data is fetched and there is connection", async () => {
		jest.spyOn(Date, "now").mockReturnValue(1)
		const mockSetItem = jest.spyOn(storage, "setItem").mockResolvedValue()

		const getFn = jest.fn().mockResolvedValue({ userid: "123" })
		const {} = renderHook(() =>
			useHandleGet({
				getFn: () => getFn(),
				queryKey: ["test"],
				enabled: true,
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(getFn).toHaveBeenCalled()
			expect(mockSetItem).toHaveBeenCalledWith('["test"]', {
				data: {
					userid: "123",
				},
				timestamp: Date.now(),
			})
		})
	})

	it("should fetch from cache when there is no connection", async () => {
		jest.spyOn(
			require("@react-native-community/netinfo"),
			"useNetInfo"
		).mockReturnValue({ isConnected: false })
		const mockGetItem = jest
			.spyOn(storage, "getItem")
			.mockResolvedValue({ data: { userid: "123" } })

		const getFn = jest.fn().mockResolvedValue({ oldData: "oldData" })
		const { result } = renderHook(() =>
			useHandleGet({
				getFn: () => getFn(),
				queryKey: ["test"],
				enabled: true,
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(result.current.data).toEqual({ userid: "123" })
			expect(mockGetItem).toHaveBeenCalled()
		})
	})
})
