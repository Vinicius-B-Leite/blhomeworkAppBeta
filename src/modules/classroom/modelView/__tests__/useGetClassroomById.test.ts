import { useGetClassroomById } from "../useGetClassroomById.modelView"
import { classroomApi } from "../../api"
import { mocks } from "./__mocks__/classrooModelViewMocks"
import { renderHook, waitFor } from "@/testUtils"

describe("modelView: useGetClassroomById", () => {
	it("should return classroom data", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useGetClassroomById({
				classroomId: "1",
				onError,
			})
		)

		await waitFor(async () => expect(result.current.isLoading).toBe(true))

		await waitFor(async () => {
			expect(result.current.classroom).toEqual(mocks.classroomParsed[0])
			expect(onError).not.toHaveBeenCalled()
		})
	})
	it("should return null when classroom empty", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(null)
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useGetClassroomById({
				classroomId: "1",
				onError,
			})
		)

		await waitFor(async () => expect(result.current.isLoading).toBe(true))

		await waitFor(async () => {
			expect(result.current.classroom).toBe(null)
			expect(onError).not.toHaveBeenCalled()
		})
	})
	it("should return error", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue(new Error("error"))
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useGetClassroomById({
				classroomId: "1",
				onError,
			})
		)

		await waitFor(async () => expect(result.current.isLoading).toBe(true))

		await waitFor(async () => {
			expect(result.current.classroom).toBe(null)
			expect(onError).toHaveBeenCalled()
		})
	})
})
