import { act, renderHook, screen, waitFor } from "@/testUtils"
import { useDoneTask } from "../useDoneTask.modelView"
import { TASK_QUERY_KEY, taskApi } from "../../api"

const mockinvalidateQueries = jest.fn()
jest.mock("@tanstack/react-query", () => {
	const originalModule = jest.requireActual("@tanstack/react-query")
	return {
		...originalModule,
		useQueryClient: () => ({
			invalidateQueries: mockinvalidateQueries,
		}),
	}
})

jest.mock("@/modules/auth/context", () => ({
	useAuth: () => ({ user: { uid: "uid" } }),
}))

describe("modelView: useDoneTask", () => {
	it("should call onError when mark task as done fails", async () => {
		jest.spyOn(taskApi, "markTaskAsDone").mockRejectedValue({ message: "error" })

		const onSuccess = jest.fn()
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useDoneTask({
				classroomId: "classroomId",
				onSuccess,
				onError,
			})
		)

		await act(async () => {
			await result.current.markTaskAsDone({ taskId: "taskId" })
		})

		await waitFor(() => {
			expect(onSuccess).not.toHaveBeenCalled()
			expect(mockinvalidateQueries).not.toHaveBeenCalledWith({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, "classroomId"],
			})
			expect(onError).toHaveBeenCalledWith("error")
		})
	})

	it("should mark task as done and call onSuccess prop and cancell schedule notification", async () => {
		jest.spyOn(taskApi, "markTaskAsDone").mockResolvedValue()
		jest.spyOn(
			require("@/service/notifications"),
			"getAllScheduleNotifications"
		).mockResolvedValue([
			{
				content: {
					data: {
						taskId: "taskId",
					},
				},
				identifier: "identifier",
			},
		])
		const mockCancellNotification = jest
			.spyOn(require("@/service/notifications"), "cancelScheduleNotification")
			.mockResolvedValue({})

		const onSuccess = jest.fn()
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useDoneTask({
				classroomId: "classroomId",
				onSuccess,
				onError,
			})
		)

		await act(async () => {
			await result.current.markTaskAsDone({ taskId: "taskId" })
		})

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalled()
			expect(mockinvalidateQueries).toHaveBeenCalledWith({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, "classroomId"],
			})
			expect(mockCancellNotification).toHaveBeenCalledWith({
				notificationId: "identifier",
			})
		})
		screen.unmount()
	})
})
