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
import { authApi } from "@/modules/auth/api"

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
	beforeAll(() => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
	})
	it("should show task list", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue({
			...mocks.user,
			uid: mocks.tasks[0].classroom.admin_id,
		})
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		renderScreen(<TaskListScreen />)

		await waitFor(() => {
			expect(screen.getByText("Task Title 1")).toBeDefined()
		})
	})

	it("should show float button when user is admin", async () => {
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

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
			screen: "UpsertTask",
			params: {
				classroomId: "classroom1",
				isUpdate: false,
			},
		})
	})
	it("should not show float button when user is not admin", async () => {
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

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
