import { act, renderHook, waitFor } from "@/testUtils"
import { useupdateTask } from "../useUpdateTask.modelView"
import { TASK_QUERY_KEY, taskApi } from "../../api"
import { mocks } from "./__mocks__/taskModelViewMocks"
import { taskAdapter } from "../../model/taskAdapter"

const mockinvalidateQueries = jest.fn()
jest.mock("@tanstack/react-query", () => ({
	...jest.requireActual("@tanstack/react-query"),
	useQueryClient: () => ({
		invalidateQueries: mockinvalidateQueries,
	}),
}))
describe("modelView: useUpadateTask", () => {
	it("should called onError when faliure", async () => {
		jest.spyOn(taskApi, "updateTask").mockRejectedValue({ message: "error" })

		const onSuccess = jest.fn()
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useupdateTask({
				classroomId: "classroomId",
				onError,
				onSuccess,
			})
		)

		const { deadLine, id, subject, title, uploads, description } =
			taskAdapter.taskApiResponseToTask(mocks.tasks[0])
		await act(async () => {
			await result.current.updateTask({
				task: {
					deadLine,
					id,
					title,
					description,
					subjectId: subject.id,
					files: undefined,
				},
			})
		})

		await waitFor(() => {
			expect(onSuccess).not.toHaveBeenCalled()
			expect(mockinvalidateQueries).not.toHaveBeenCalledWith({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, "classroomId"],
			})
			expect(onError).toHaveBeenCalledWith("error")
		})
	})
	it("should update task and update task list", async () => {
		jest.spyOn(taskApi, "updateTask").mockResolvedValue(mocks.tasks[0])

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useupdateTask({
				classroomId: "classroomId",
				onError: jest.fn(),
				onSuccess,
			})
		)

		const { deadLine, id, subject, title, uploads, description } =
			taskAdapter.taskApiResponseToTask(mocks.tasks[0])
		await act(async () => {
			await result.current.updateTask({
				task: {
					deadLine,
					id,
					title,
					description,
					subjectId: subject.id,
					files: undefined,
				},
			})
		})

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalled()
			expect(mockinvalidateQueries).toHaveBeenCalledWith({
				queryKey: [TASK_QUERY_KEY.GET_TASK_LIST, "classroomId"],
			})
		})
	})
})
