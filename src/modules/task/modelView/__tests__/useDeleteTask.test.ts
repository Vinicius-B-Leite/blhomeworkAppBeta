import { act, renderHook, waitFor } from "@/testUtils"
import { useDeleteTask } from "../useDeleteTask.modelView"
import { taskApi } from "@/modules/task/api"

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

describe("modelView: useDeleteTask", () => {
	it("should delete Task, call onSuccess and refetch Task list", async () => {
		jest.spyOn(taskApi, "deleteTask").mockResolvedValue()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useDeleteTask({
				classroomId: "classroomId",
				onSuccess,
				onError: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.deleteTask({ taskId: "taskId" })
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
		await waitFor(() => expect(mockinvalidateQueries).toHaveBeenCalled())
	})

	it("should call on erro when it has error", async () => {
		jest.spyOn(taskApi, "deleteTask").mockRejectedValue({ message: "error" })
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useDeleteTask({
				classroomId: "classroom1",
				onError,
				onSuccess: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.deleteTask({
				taskId: "Task1",
			})
		})
		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
