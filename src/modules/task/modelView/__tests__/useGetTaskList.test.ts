import { renderHook, screen, waitFor } from "@/testUtils"
import { useGetTaskListModelView } from "../useGetTaskList.modelView"
import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/taskModelViewMocks"
import { taskAdapter } from "@/modules/task/model/taskAdapter"

describe("modelView: useGetTaskListModelView", () => {
	afterEach(() => {
		jest.restoreAllMocks()
		jest.clearAllMocks()
	})

	it("should return empty list when classroom has NOT tasks ", async () => {
		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce([])

		const { result } = renderHook(() =>
			useGetTaskListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(true)
		})

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.taskList).toEqual([])
		})
	})
	it("should return taskList and isLoading", async () => {
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])

		const { result } = renderHook(() =>
			useGetTaskListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)

			expect(result.current.taskList).toEqual(
				mocks.tasks.map((task) =>
					taskAdapter.taskApiResponseToTask(task, undefined)
				)
			)
		})
		screen.unmount()
	})
	it("should call onError prop when it has error ", async () => {
		jest.spyOn(taskApi, "getTaskList").mockRejectedValueOnce({ message: "error" })

		const onError = jest.fn()
		const { result } = renderHook(() =>
			useGetTaskListModelView({
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
