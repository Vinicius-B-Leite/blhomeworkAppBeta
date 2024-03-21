import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { SubjectsScreen } from "../SubjectsScreen"
import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/subjectScreenMock"
import { taskAdapter } from "@/modules/task/model"

const mockOnSelectSubject = jest.fn()
jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({ onSelectSubject: mockOnSelectSubject, classroomId: "1" }),
}))

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}))
describe("integration: SubjectsScreen", () => {
	it("should show the subjects list and select one", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		renderScreen(<SubjectsScreen />)
		const subjectsList = await screen.findByTestId("subjectsList")

		await waitFor(() => expect(subjectsList.props.data.length).toBe(20))

		const subjectFormated = taskAdapter.subjectApiResponseToSubject(mocks.subjects[0])
		const subject = await screen.findByText(subjectFormated.name)
		fireEvent.press(subject)

		expect(mockOnSelectSubject).toHaveBeenCalledWith(subjectFormated)
	})
	it("should navigate to create subject screen when create button is pressed", () => {
		renderScreen(<SubjectsScreen />)

		fireEvent.press(screen.getByText("Criar disciplina"))

		expect(mockNavigate).toHaveBeenCalledWith("TaskRoutes", {
			params: { classroomId: "1", isUpdate: false },
			screen: "CreateSubject",
		})
	})
	it("should show error toast when getSubjectList fails", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockRejectedValue({ message: "Error" })

		renderScreen(<SubjectsScreen />)

		const toast = await screen.findByText("Erro ao buscar disciplinas!")
		expect(toast).toBeTruthy()
	})
	it("should refresh list", async () => {
		const list1 = mocks.subjects.slice(0, 10)
		const list2 = mocks.subjects

		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(list1)

		renderScreen(<SubjectsScreen />)

		const subjectsList = await screen.findByTestId("subjectsList")
		await waitFor(() => expect(subjectsList.props.data.length).toBe(10))
		const { refreshControl } = subjectsList.props

		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(list2)
		await act(() => {
			refreshControl.props.onRefresh()
		})

		await waitFor(() => expect(subjectsList.props.data.length).toBe(20))
	})
	it("should go back when back icon is pressed", () => {
		renderScreen(<SubjectsScreen />)
		fireEvent.press(screen.getByTestId("backIcon"))
		expect(mockGoBack).toHaveBeenCalled()
	})
})
