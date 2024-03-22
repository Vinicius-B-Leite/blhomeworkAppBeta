import {
	act,
	fireEvent,
	renderScreen,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@/testUtils"
import { SubjectsScreen } from "../SubjectsScreen"
import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/subjectScreenMock"
import { taskAdapter } from "@/modules/task/model"

const mockOnSelectSubject = jest.fn()
jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		onSelectSubject: mockOnSelectSubject,
		classroomId: "1",
		selectedSubjectId: "2",
	}),
}))

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}))
describe("integration: SubjectsScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
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
			screen: "UpsertSubjectScreen",
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

	it("should delete subject", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(mocks.subjects)
		jest.spyOn(taskApi, "deltedSubject").mockImplementation()

		renderScreen(<SubjectsScreen />)

		const math = await screen.findByText("Matemática")
		await act(async () => {
			fireEvent(math, "longPress")
		})

		await waitFor(() => expect(screen.getByTestId("back-button")).toBeTruthy())
		const deleteButton = await screen.findByTestId("trash")

		let subjectWithoutMath = mocks.subjects.filter(
			(subject) => subject.title !== "Matemática"
		)
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(subjectWithoutMath)

		await act(async () => {
			await fireEvent.press(deleteButton)
		})

		await waitFor(() => {
			expect(screen.queryByText("Matemática")).toBeNull()
		})
	})
	it("should show toast error if subject to delete is selected on create task form", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(mocks.subjects)
		jest.spyOn(taskApi, "deltedSubject").mockImplementation()

		renderScreen(<SubjectsScreen />)

		const math = await screen.findByText("Ciências")
		await act(async () => {
			fireEvent(math, "longPress")
		})

		await waitFor(() => expect(screen.getByTestId("back-button")).toBeTruthy())
		const deleteButton = await screen.findByTestId("trash")

		await act(async () => {
			await fireEvent.press(deleteButton)
		})

		await waitFor(() => {
			expect(
				screen.getByText("Você não pode deletar a disciplina selecionada!")
			).toBeTruthy()
		})
		screen.unmount()
	})
	it("should show generic error message if happend some erro in delete subject", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(mocks.subjects)
		jest.spyOn(taskApi, "deltedSubject").mockRejectedValue({ message: "Error" })

		renderScreen(<SubjectsScreen />)

		const math = await screen.findByText("Matemática")
		await act(async () => {
			fireEvent(math, "longPress")
		})

		await waitFor(() => expect(screen.getByTestId("back-button")).toBeTruthy())
		const deleteButton = await screen.findByTestId("trash")

		await act(async () => {
			await fireEvent.press(deleteButton)
		})

		await waitFor(() => {
			expect(screen.getByText("Erro ao deletar disciplinas!")).toBeTruthy()
		})
	})
	it("should navigate to upsert subject when clicked on update option on animated header", async () => {
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValueOnce(mocks.subjects)

		renderScreen(<SubjectsScreen />)

		const math = await screen.findByText("Matemática")
		await act(async () => {
			fireEvent(math, "longPress")
		})

		await waitFor(() => expect(screen.getByTestId("back-button")).toBeTruthy())
		const updateButton = await screen.findByTestId("pen")

		await act(async () => {
			await fireEvent.press(updateButton)
		})

		const { color_rgb, id, short_name, title } = mocks.subjects[0]
		expect(mockNavigate).toHaveBeenCalledWith("TaskRoutes", {
			params: {
				classroomId: "1",
				isUpdate: true,
				subject: {
					color: color_rgb,
					id: id,
					name: title,
					shortName: short_name,
				},
			},
			screen: "UpsertSubjectScreen",
		})
	})
})
