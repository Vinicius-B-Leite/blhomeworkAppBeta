import { fireEvent, renderScreen, screen } from "@/testUtils"
import { TaskDetailsScreen } from "../TaskDetailsScreen"
import { formatDate } from "@/utils"
import * as WebBrowser from "expo-web-browser"
import { mocks } from "./__mocks__/taskDetailsMock"

jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		task: mocks.task[0],
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
})
