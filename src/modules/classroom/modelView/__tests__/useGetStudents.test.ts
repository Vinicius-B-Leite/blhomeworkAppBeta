import { act, renderHook, waitFor } from "@/testUtils"
import { useGetStudents } from "@/modules/classroom/modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"

describe("modelView: useGetStudents", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	it("should return classroom list and update isLoading", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValueOnce(
			mocks.studentsApiResponse
		)
		const { result } = renderHook(() =>
			useGetStudents({
				classroomId: "1",
			})
		)

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.students).toEqual(mocks.studentsParsed)
	})
	it("should call refresh correctly", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValueOnce(
			mocks.studentsApiResponse
		)
		const { result } = renderHook(() =>
			useGetStudents({
				classroomId: "1",
			})
		)

		jest.spyOn(classroomApi, "getStudents").mockResolvedValueOnce(
			mocks.studentsApiResponse.splice(0, 1)
		)
		await waitFor(() => expect(result.current.isLoading).toBe(false))
		await act(async () => {
			await result.current.refresh()
		})

		const parsedStudent = mocks.studentsParsed.splice(0, 1)
		await waitFor(() => {
			expect(result.current.students).toEqual(parsedStudent)
		})
	})

	it("should return an empty array", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue([])
		const { result } = renderHook(() =>
			useGetStudents({
				classroomId: "1",
			})
		)

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.students).toEqual([])
	})

	it("should call onError if error", async () => {
		jest.spyOn(classroomApi, "getStudents").mockRejectedValue({ message: "Error" })
		const mockOnError = jest.fn()
		const { result } = renderHook(() =>
			useGetStudents({ classroomId: "1", onError: mockOnError })
		)

		await waitFor(() => expect(result.current.isLoading).toBe(true))
		await waitFor(() => expect(result.current.isLoading).toBe(false))

		expect(result.current.students).toEqual([])
		expect(mockOnError).toHaveBeenCalledWith("Error")
	})
})
