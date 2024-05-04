import { fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { TaskDetailsScreen } from "../TaskDetailsScreen"
import { formatDate } from "@/utils"
import * as WebBrowser from "expo-web-browser"
import { mocks } from "./__mocks__/taskDetailsMock"
import { taskApi } from "@/modules/task/api"

jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		task: mocks.task[0],
		classroomId: "1",
	}),
}))

const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		goBack: mockGoBack,
	}),
}))

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: {
			uid: "1",
		},
	}),
}))

describe("integration: TaskDetailsScreen", () => {
	it("should show the task details correctly", () => {
		renderScreen(<TaskDetailsScreen />)

		expect(screen.getByText(mocks.task[0].title)).toBeTruthy()
		expect(
			screen.getByText(formatDate(mocks.task[0].deadLine), { exact: false })
		).toBeTruthy()
		expect(screen.getByText(mocks.task[0].description)).toBeTruthy()

		expect(screen.getByText("Arquivo 1.pdf")).toBeTruthy()
	})

	it("should open the file when the user press the file", () => {
		const openBrowserAsync = jest.fn()
		jest.spyOn(WebBrowser, "openBrowserAsync").mockImplementation(openBrowserAsync)

		renderScreen(<TaskDetailsScreen />)

		fireEvent.press(screen.getByText("Arquivo 1.pdf"))

		expect(openBrowserAsync).toHaveBeenCalledWith(
			mocks.task[0].uploads[0].donwloadUrl
		)
	})

	it('should show "Sem descrição" when the task has no description', () => {
		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			task: {
				...mocks.task[0],
				description: "",
			},
		})
		renderScreen(<TaskDetailsScreen />)
		expect(screen.getByText("Sem descrição")).toBeTruthy()
	})

	it("should show image icon when the file is an image", () => {
		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			task: {
				...mocks.task[0],
				uploads: [
					{
						id: "1",
						donwloadUrl: "http://example.com",
						type: "image",
						taskId: "1",
					},
				],
			},
		})
		renderScreen(<TaskDetailsScreen />)
		expect(screen.getByTestId("image-icon")).toBeTruthy()
	})
	it("should show error toast when mark a task as done fails", async () => {
		jest.spyOn(taskApi, "markTaskAsDone").mockRejectedValue({ message: "error" })
		renderScreen(<TaskDetailsScreen />)

		fireEvent.press(screen.getByText("concluir"))

		await waitFor(() => {
			expect(screen.getByText("Erro ao concluir tarefa!")).toBeTruthy()
			expect(mockGoBack).not.toHaveBeenCalled()
		})
		screen.unmount()
	})
	it("should mark a task as done", async () => {
		jest.spyOn(taskApi, "markTaskAsDone").mockResolvedValue()
		renderScreen(<TaskDetailsScreen />)

		fireEvent.press(screen.getByText("concluir"))

		await waitFor(() => {
			expect(screen.getByText("Tarefa concluída com sucesso!")).toBeTruthy()
			expect(mockGoBack).toHaveBeenCalled()
		})
		screen.unmount()
	})
})
