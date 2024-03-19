import {
	fireEvent,
	renderScreen,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@/testUtils"
import { TaskListScreen } from "../TaskListScreen"
import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/tasklistScreenMock"
import { authStorage } from "@/modules/auth/storage"

jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		classroom: {
			adminId: "admin1",
			id: "classroom1",
			title: "Classroom 1",
		},
	}),
}))

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({ navigate: mockNavigate }),
}))
describe("integration: TaskListScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	it("should show task list", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)

		renderScreen(<TaskListScreen />)

		await waitFor(() => {
			expect(screen.getByText("Task Title 1")).toBeDefined()
		})
	})

	it("should show float button when user is admin", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue({
			...mocks.user,
			uid: mocks.tasks[0].classroom.admin_id,
		})
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)

		renderScreen(<TaskListScreen />)

		const floatButton = await screen.findByTestId("float-button")
		expect(floatButton).toBeDefined()

		fireEvent.press(floatButton)

		expect(mockNavigate).toHaveBeenCalledWith("TaskRoutes", {
			screen: "CreateTask",
			params: {
				classroomId: "classroom1",
			},
		})
	})
	it("should not show float button when user is not admin", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue({
			...mocks.user,
		})
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)

		renderScreen(<TaskListScreen />)

		expect(await screen.queryByTestId("float-button")).toBeNull()
	})
	it("should show error toast when it has error", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(taskApi, "getTaskList").mockRejectedValue({ message: "error" })

		renderScreen(<TaskListScreen />)

		await waitFor(() => {
			expect(screen.getByText("Erro ao carregar tarefas")).toBeDefined()
		})
	})
	it("should show empty list when classroom has NOT tasks", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue([])

		renderScreen(<TaskListScreen />)
		const flatList = await screen.findByTestId("task-list")
		await waitFor(() => {
			expect(flatList.props.data).toHaveLength(0)
		})
	})
})
