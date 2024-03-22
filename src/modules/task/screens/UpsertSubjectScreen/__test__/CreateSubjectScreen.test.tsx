import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { UpsertSubjectScreen } from "../UpsertSubjectScreen"
import { taskApi } from "@/modules/task/api"

jest.mock("@/hooks", () => {
	return {
		...jest.requireActual("@/hooks"),
		useRouteParams: () => ({
			classroomId: "1",
			isUpdate: false,
		}),
	}
})

const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => {
	return {
		...jest.requireActual("@react-navigation/native"),
		useNavigation: () => ({
			goBack: mockGoBack,
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

	it('should show "salvar", "Atualizar Disciplina", selected color and fill inputs  when is update', () => {
		const color = "rgb(255, 0, 255)"
		const name = "Matemática"
		const shortName = "MAT"
		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroomId: "1",
			isUpdate: true,
			subject: {
				color: color,
				id: "1",
				name: name,
				shortName: shortName,
			},
		})

		renderScreen(<UpsertSubjectScreen />)

		expect(screen.getByText("Atualizar Disciplina")).toBeTruthy()
		expect(screen.getByText("Salvar")).toBeTruthy()
		const colorPickerValue =
			screen.getByTestId("colorPicker").props.children.props.value
		expect(colorPickerValue).toBe(color)
		expect(screen.getByPlaceholderText("rgb(0, 0, 0)").props.value).toBe(color)
		expect(screen.getByPlaceholderText("MAT").props.value).toBe(shortName)
		expect(screen.getByPlaceholderText("Matemática").props.value).toBe(name)
	})
	it("should update a subject", async () => {
		jest.spyOn(taskApi, "updateSubject").mockResolvedValue({
			color_rgb: "rgb(0, 255, 0)",
			id: "1",
			title: "Biologia",
			short_name: "BIO",
		})
		const color = "rgb(255, 0, 255)"
		const name = "Matemática"
		const shortName = "MAT"
		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroomId: "1",
			isUpdate: true,
			subject: {
				color: color,
				id: "1",
				name: name,
				shortName: shortName,
			},
		})

		renderScreen(<UpsertSubjectScreen />)

		const shortNameInput = screen.getByPlaceholderText("MAT")
		const nameInput = screen.getByPlaceholderText("Matemática")
		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const submitButton = screen.getByText("Salvar")

		fireEvent.changeText(shortNameInput, "BIO")
		fireEvent.changeText(nameInput, "Biologia")
		fireEvent.changeText(colorInput, "rgb(0, 255, 0)")

		await act(() => {
			fireEvent.press(submitButton)
		})

		expect(mockGoBack).toHaveBeenCalled()
		screen.unmount()
	})
	it("should show error if update a subject falid", async () => {
		jest.spyOn(taskApi, "updateSubject").mockRejectedValue({ message: "error" })
		const color = "rgb(255, 0, 255)"
		const name = "Matemática"
		const shortName = "MAT"
		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroomId: "1",
			isUpdate: true,
			subject: {
				color: color,
				id: "1",
				name: name,
				shortName: shortName,
			},
		})

		renderScreen(<UpsertSubjectScreen />)

		const shortNameInput = screen.getByPlaceholderText("MAT")
		const nameInput = screen.getByPlaceholderText("Matemática")
		const colorInput = screen.getByPlaceholderText("rgb(0, 0, 0)")
		const submitButton = screen.getByText("Salvar")

		fireEvent.changeText(shortNameInput, "BIO")
		fireEvent.changeText(nameInput, "Biologia")
		fireEvent.changeText(colorInput, "rgb(0, 255, 0)")

		await act(() => {
			fireEvent.press(submitButton)
		})

		expect(await screen.findByText("Erro ao atualizar disciplina!")).toBeTruthy()
	})
})
