import { renderHook, screen, waitFor } from "@/testUtils"

import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/taskModelViewMocks"
import { taskAdapter } from "@/modules/task/model/taskAdapter"
import { useGetSubjectListModelView } from "../useGetSubjectList.modelView"

describe("modelView: useGetSubjectListModelView", () => {
	afterEach(() => {
		jest.restoreAllMocks()
		jest.clearAllMocks()
	})

	it("should return empty list when has NO subjects ", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce([])

		const { result } = renderHook(() =>
			useGetSubjectListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(true)
		})

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.subjectList).toEqual([])
		})
	})
	it("should return subjectList and isLoading", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(mocks.subjects)

		const { result } = renderHook(() =>
			useGetSubjectListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.subjectList).toEqual(
				mocks.subjects.map(taskAdapter.subjectApiResponseToSubject)
			)
		})
		screen.unmount()
	})
	it("should call onError prop when it has error ", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockRejectedValueOnce({ message: "error" })

		const onError = jest.fn()
		const { result } = renderHook(() =>
			useGetSubjectListModelView({
				classroomId: "classroomId",
				onError,
			})
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(onError).toHaveBeenCalled()
		})
	})
})
