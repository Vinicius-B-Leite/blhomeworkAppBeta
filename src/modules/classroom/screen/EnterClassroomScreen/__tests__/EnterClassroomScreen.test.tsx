import { classroomApi } from "@/modules/classroom/api"
import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { EnterClassroomScreen } from "../EnterClassroomScreen"
import { authStorage } from "@/modules/auth/storage"
import { mocks } from "./__mocks__/enterClassroomScreenMock"

jest.mock("@react-navigation/native", () => {
	const actual = jest.requireActual("@react-navigation/native")
	return {
		...actual,
		useNavigation: () => ({
			goBack: jest.fn(),
		}),
	}
})

describe("integration: EnterClassroomScreen", () => {
	it("should show toast success message if success on enter classroom", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue({
			classroom: mocks.classroomApiResponse[0].classroom,
		})
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()

		renderScreen(<EnterClassroomScreen />)

		const input = await screen.findByPlaceholderText("Código da sala", {
			exact: false,
		})

		fireEvent.changeText(input, "1234")

		const button = screen.getByText("Entrar na sala")
		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => {
			await fireEvent.press(button)
		})
		await waitFor(() => {
			expect(screen.getByText("Você entrou na sala com sucesso!")).toBeTruthy()
			expect(screen.getByTestId("toastIcon-check")).toBeTruthy()
		})
	})

	it("should show input error message if code is unvalible", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "Classroom not found",
		})
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()

		renderScreen(<EnterClassroomScreen />)

		const input = await screen.findByPlaceholderText("Código da sala", {
			exact: false,
		})

		fireEvent.changeText(input, "1234")

		const button = screen.getByText("Entrar na sala")
		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => {
			await fireEvent.press(button)
		})
		await waitFor(() =>
			expect(screen.getByText("Código da sala inválido")).toBeTruthy()
		)
	})
	it("should show toast error message if has unhandled error", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "some error",
		})
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()

		renderScreen(<EnterClassroomScreen />)

		const input = await screen.findByPlaceholderText("Código da sala", {
			exact: false,
		})

		fireEvent.changeText(input, "1234")

		const button = screen.getByText("Entrar na sala")
		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => {
			await fireEvent.press(button)
		})
		await waitFor(() => {
			expect(screen.getByText("Erro ao entrar na sala")).toBeTruthy()
			expect(screen.getByTestId("toastIcon-error")).toBeTruthy()
		})
	})
})
