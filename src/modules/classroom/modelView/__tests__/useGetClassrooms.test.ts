import { act, renderHook, screen, waitFor } from "@/testUtils"
import { useGetClassrooms } from "@/modules/classroom/modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: {
			uid: "1",
		},
	}),
}))
describe("modelView: useGetClassrooms", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	it("should return classroom list and update isLoading", async () => {
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
			mocks.classroomApiResponse
		)
		const { result } = renderHook(() => useGetClassrooms())

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.classrooms).toEqual(mocks.classroomParsed)
	})
	it("should call refresh correctly", async () => {
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
			mocks.classroomApiResponse
		)
		const { result } = renderHook(() => useGetClassrooms())

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
			mocks.classroomApiResponse.splice(0, 1)
		)
		await waitFor(() => expect(result.current.isLoading).toBe(false))
		await act(async () => {
			await result.current.refresh()
		})

		const classroomsParsed = mocks.classroomParsed.splice(0, 1)
		await waitFor(() => expect(result.current.classrooms).toEqual(classroomsParsed))
	})

	it("should return an empty array", async () => {
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue([])
		const { result } = renderHook(() => useGetClassrooms())

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.classrooms).toEqual([])
	})

	it("should call onError if error", async () => {
		jest.spyOn(classroomApi, "getClassrooms").mockRejectedValue({ message: "Error" })
		const mockOnError = jest.fn()
		const { result } = renderHook(() => useGetClassrooms({ onError: mockOnError }))

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.classrooms).toEqual([])
		expect(mockOnError).toHaveBeenCalledWith("Error")
	})
})
