import { renderHook, screen, waitFor } from "@/testUtils"
import { useGetTaskListModelView } from "../useGetTaskList.modelView"
import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/taskModelViewMocks"
import { taskAdapter } from "@/modules/task/model/taskAdapter"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: { uid: "uid" } }),
}))

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
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])
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
				mocks.tasks.map((task) => taskAdapter.taskApiResponseToTask(task, []))
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
	it("should schedule notification for each task if the task not already scheduled", async () => {
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(
			require("@/service/notifications"),
			"getAllScheduleNotifications"
		).mockResolvedValue([{ content: { data: { taskId: "randomTask" } } }])
		const mockScheduleNotification = jest
			.spyOn(require("@/service/notifications"), "scheduleNotification")
			.mockResolvedValue({})

		const { result } = renderHook(() =>
			useGetTaskListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(mockScheduleNotification).toHaveBeenCalled()
		})
		screen.unmount()
	})
	it("should NOT schedule notification if the task already scheduled", async () => {
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(
			require("@/service/notifications"),
			"getAllScheduleNotifications"
		).mockResolvedValue([{ content: { data: { taskId: mocks.tasks[0].id } } }])
		const mockScheduleNotification = jest
			.spyOn(require("@/service/notifications"), "scheduleNotification")
			.mockResolvedValue({})

		const { result } = renderHook(() =>
			useGetTaskListModelView({
				classroomId: "classroomId",
				onError: jest.fn(),
			})
		)

		await waitFor(() => {
			expect(mockScheduleNotification).not.toHaveBeenCalled()
		})
		screen.unmount()
	})
})
