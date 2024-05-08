import { storage } from "@/storage"
import { renderHook, waitFor } from "@/testUtils"
import { EXPIRATION_TIME, useCacheControll } from "../useCacheControll"

describe("useCacheControll", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should remove expired items from cache", async () => {
		const mockRemoveItem1 = jest.spyOn(storage, "removeItem").mockResolvedValue()

		jest.spyOn(storage, "getAllKeys").mockResolvedValue(["item1"])
		jest.spyOn(storage, "getItem").mockResolvedValueOnce({
			data: "data",
			timestamp: Date.now() - 2 * EXPIRATION_TIME,
		})

		const { result } = renderHook(() => useCacheControll())

		await waitFor(() => {
			expect(mockRemoveItem1).toHaveBeenCalledTimes(1)
			expect(mockRemoveItem1).toHaveBeenCalledWith({
				key: undefined,
				customKey: JSON.stringify("item1"),
			})
		})
	})

	it("should not remove items without timestamp from cache", async () => {
		const mockRemoveItem = jest.spyOn(storage, "removeItem").mockResolvedValueOnce()
		jest.spyOn(storage, "getAllKeys").mockResolvedValue(["item1", "item2"])
		jest.spyOn(storage, "getItem").mockResolvedValueOnce({
			data: "data",
			timestamp: Date.now(),
		})

		const { result } = renderHook(() => useCacheControll())

		await waitFor(() => {
			expect(mockRemoveItem).not.toHaveBeenCalledTimes(1)
			expect(mockRemoveItem).not.toHaveBeenCalledWith({
				key: undefined,
				customKey: JSON.stringify("item1"),
			})
		})
	})
})
