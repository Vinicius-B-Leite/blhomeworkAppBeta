import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { UpsertSubjectScreen } from "../UpsertSubjectScreen"
import { taskApi } from "@/modules/task/api"

jest.mock("@/hooks", () => {
	return {
		...jest.requireActual("@/hooks"),
		useRouteParams: () => ({
			classroomId: "1",
		}),
	}
})

jest.mock("@react-navigation/native", () => {
	return {
		...jest.requireActual("@react-navigation/native"),
		useNavigation: () => ({
			goBack: jest.fn(),
		}),
	}
})
describe("integration: UpsertSubjectScreen", () => {
	it("should show error message in inputs when submit with empty fields", async () => {
		renderScreen(<UpsertSubjectScreen />)

		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const shortNameInput = screen.getByPlaceholderText("MAT")
		const nameInput = screen.getByPlaceholderText("Matemática")
		const submitButton = screen.getByText("Criar")

		fireEvent.changeText(colorInput, "")
		await act(() => fireEvent.press(submitButton))
		expect(await screen.findByText("Mínimo de 4 caracteres")).toBeTruthy()

		fireEvent.changeText(colorInput, "rgb(255, 255, 255)")
		await act(() => fireEvent.press(submitButton))
		expect(await screen.queryByText("Mínimo de 4 caracteres")).not.toBeTruthy()
		expect(await screen.findByText("Deve ter 3 caracteres")).toBeTruthy()

		fireEvent.changeText(shortNameInput, "MAT")
		await act(() => fireEvent.press(submitButton))
		expect(await screen.queryByText("Deve ter 3 caracteres")).not.toBeTruthy()
		expect(await screen.queryByText("Mínimo de 4 caracteres")).not.toBeTruthy()
		expect(await screen.findByText("Mínimo de 3 caracteres")).toBeTruthy()

		fireEvent.changeText(nameInput, "Matemática")
		await act(() => fireEvent.press(submitButton))
		expect(await screen.queryByText("Mínimo de 3 caracteres")).not.toBeTruthy()
		expect(await screen.queryByText("Deve ter 3 caracteres")).not.toBeTruthy()
		expect(await screen.queryByText("Mínimo de 4 caracteres")).not.toBeTruthy()
	})

	it("should show color format error message", async () => {
		renderScreen(<UpsertSubjectScreen />)

		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const submitButton = screen.getByText("Criar")

		fireEvent.changeText(colorInput, "#ffffff")
		await act(() => fireEvent.press(submitButton))
		expect(
			await screen.queryByText("Cor deve ser RGB. Ex: rgb(255, 255, 255)")
		).toBeTruthy()

		fireEvent.changeText(colorInput, "rgb(255, 0, 255)")
		await act(() => fireEvent.press(submitButton))
		expect(
			await screen.queryByText("Cor deve ser RGB. Ex: rgb(255, 255, 255)")
		).not.toBeTruthy()

		screen.unmount()
	})

	it("should show toast error when submit has an error", async () => {
		jest.spyOn(taskApi, "createSubject").mockRejectedValue({ error: "error" })
		renderScreen(<UpsertSubjectScreen />)

		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const shortNameInput = screen.getByPlaceholderText("MAT")
		const nameInput = screen.getByPlaceholderText("Matemática")
		const submitButton = screen.getByText("Criar")

		fireEvent.changeText(colorInput, "rgb(255, 0, 255)")
		fireEvent.changeText(shortNameInput, "MAT")
		fireEvent.changeText(nameInput, "Matemática")
		await act(() => fireEvent.press(submitButton))

		expect(await screen.findByText("Erro ao criar disciplina!")).toBeTruthy()
		expect(await screen.findByTestId("toastIcon-error")).toBeTruthy()
		screen.unmount()
	})
	it("should create an subject", async () => {
		jest.spyOn(taskApi, "createSubject").mockResolvedValue({
			color_rgb: "rgb(255, 0, 255)",
			id: "1",
			title: "Matemática",
			short_name: "MAT",
		})
		renderScreen(<UpsertSubjectScreen />)

		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const shortNameInput = screen.getByPlaceholderText("MAT")
		const nameInput = screen.getByPlaceholderText("Matemática")
		const submitButton = screen.getByText("Criar")

		fireEvent.changeText(colorInput, "rgb(255, 0, 255)")
		fireEvent.changeText(shortNameInput, "MAT")
		fireEvent.changeText(nameInput, "Matemática")
		await act(() => fireEvent.press(submitButton))

		expect(await screen.findByText("Disciplina criada com sucesso!")).toBeTruthy()

		expect(await screen.findByTestId("toastIcon-check")).toBeTruthy()
	})
})
