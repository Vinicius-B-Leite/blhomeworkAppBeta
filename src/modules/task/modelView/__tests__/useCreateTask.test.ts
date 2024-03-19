import { act, renderHook, waitFor } from "@/testUtils"
import { useCreateSubject } from "../useCreateSubject.modelView"
import { taskApi } from "../../api"
import { mocks } from "./__mocks__/taskModelViewMocks"
import { useCreateTask } from "../useCreateTask.modelView"
import mock from "react-native-safe-area-context/jest/mock"

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

jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		goBack: jest.fn(),
	}),
}))
describe("modelView: useCreateTaskModelView", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should create a new task and call onSuccess and update subject list", async () => {
		jest.spyOn(taskApi, "createTask").mockResolvedValue(mocks.tasks[0])
		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useCreateTask({
				classroomId: "classroom1",
				onError: jest.fn(),
				onSuccess,
			})
		)

		await act(async () => {
			await result.current.createTaskt({
				classroomId: "classroom1",
				subjectId: mocks.tasks[0].subject_id,
				task: {
					deadLine: new Date(mocks.tasks[0].dead_line),
					title: mocks.tasks[0].title,
					description: mocks.tasks[0].description,
				},
			})
		})
		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
		await waitFor(() => expect(mockinvalidateQueries).toHaveBeenCalled())
	})

	it("should call on erro when it has error", async () => {
		jest.spyOn(taskApi, "createTask").mockRejectedValue({ message: "error" })
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useCreateTask({
				classroomId: "classroom1",
				onError,
				onSuccess: jest.fn(),
			})
		)
		await act(async () => {
			await result.current.createTaskt({
				classroomId: "classroom1",
				subjectId: mocks.tasks[0].subject_id,
				task: {
					deadLine: new Date(mocks.tasks[0].dead_line),
					title: mocks.tasks[0].title,
					description: mocks.tasks[0].description,
				},
			})
		})
		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
