import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { SingUpScreen } from "../SingUpScreen"
import { authApi } from "@/modules/auth/api"
import { AuthResponse } from "@/modules/auth/models/authTypes"
import { mocks } from "./__mocks__/singUpScreenMocks"
import { iconMap } from "@/components"
import { toastMap } from "@/components"

const mockGoBack = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		goBack: mockGoBack,
	}),
}))
describe("integration: SingUpScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	afterAll(() => {
		jest.useRealTimers()
	})
	it("should show all validations", async () => {
		jest.spyOn(authApi, "singUp").mockResolvedValue({} as AuthResponse)
		renderScreen(<SingUpScreen />)

		const usernameInput = await screen.findByPlaceholderText("Nome de usuário")
		const emailInput = await screen.findByPlaceholderText("Seu email")
		const passwordInput = await screen.findByPlaceholderText("Sua senha")
		const confirmPasswordInput = await screen.findByPlaceholderText(
			"Confirme sua senha"
		)

		await act(() => {
			fireEvent.changeText(usernameInput, "ab")
			fireEvent.changeText(emailInput, "invalid-email")
			fireEvent.changeText(passwordInput, "123")
			fireEvent.changeText(confirmPasswordInput, "123")
		})

		expect(
			await screen.findByText("Nome de usuário deve ter no mínimo 3 caracteres")
		).toBeTruthy()
		expect(await screen.findByText("Email inválido")).toBeTruthy()
		expect(
			await screen.findAllByText("Senha deve ter no mínimo 6 caracteres")
		).toBeTruthy()

		await act(() => {
			fireEvent.changeText(passwordInput, "123123")
			fireEvent.changeText(confirmPasswordInput, "321321")
		})

		expect(await screen.findByText("As senhas não são iguais")).toBeTruthy()
		expect(screen.getByText("Criar conta")).toBeDisabled()
	})
	it("should create a user if all fields are valid", async () => {
		jest.useFakeTimers()
		jest.spyOn(authApi, "singUp").mockResolvedValue({
			session: {
				access_token: mocks.user.token,
				expires_at: 123123123,
				expires_in: 123123123,
				refresh_token: mocks.user.refreshtoken,
				token_type: "fake-token",
				//@ts-ignore
				user: {
					user_metadata: {
						username: mocks.user.username,
					},
					email: mocks.user.email,
					id: mocks.user.uid,
				},
			},
		})
		renderScreen(<SingUpScreen />)

		const usernameInput = await screen.findByPlaceholderText("Nome de usuário")
		const emailInput = await screen.findByPlaceholderText("Seu email")
		const passwordInput = await screen.findByPlaceholderText("Sua senha")
		const confirmPasswordInput = await screen.findByPlaceholderText(
			"Confirme sua senha"
		)

		await act(() => {
			fireEvent.changeText(usernameInput, mocks.user.username)
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, mocks.user.password)
			fireEvent.changeText(confirmPasswordInput, mocks.user.password)
		})

		await act(async () => {
			await fireEvent.press(screen.getByText("Criar conta"))
		})
		await act(async () => {
			await jest.advanceTimersByTime(900)
		})

		expect(mockGoBack).toHaveBeenCalled()

		const successToastMessage = await screen.findByText(
			/Cadastro realizado com sucesso/i
		)

		expect(successToastMessage).toBeTruthy()
		jest.useRealTimers()
	})
	it("should show toast error with has some error in api that it was NOT handler", async () => {
		jest.useFakeTimers()

		jest.spyOn(authApi, "singUp").mockRejectedValue({ message: "some error" })
		renderScreen(<SingUpScreen />)

		const usernameInput = await screen.findByPlaceholderText("Nome de usuário")
		const emailInput = await screen.findByPlaceholderText("Seu email")
		const passwordInput = await screen.findByPlaceholderText("Sua senha")
		const confirmPasswordInput = await screen.findByPlaceholderText(
			"Confirme sua senha"
		)

		await act(() => {
			fireEvent.changeText(usernameInput, mocks.user.username)
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, mocks.user.password)
			fireEvent.changeText(confirmPasswordInput, mocks.user.password)
		})
		await act(async () => {
			await fireEvent.press(screen.getByText("Criar conta"))
		})
		await act(async () => {
			await jest.advanceTimersByTime(900)
		})

		const errorToastMessage = await screen.findByText(/Erro ao realizar cadastro!/i)
		const errorToastIcon = await screen.findByTestId(
			"toastIcon-" + toastMap.error.iconName
		)
		expect(errorToastMessage).toBeTruthy()
		expect(errorToastIcon).toBeTruthy()

		jest.useRealTimers()
	})
	it("should show input message error with has some error in api that it was handler", async () => {
		jest.spyOn(authApi, "singUp").mockRejectedValue({
			message: "User already registered",
		})
		renderScreen(<SingUpScreen />)

		const usernameInput = await screen.findByPlaceholderText("Nome de usuário")
		const emailInput = await screen.findByPlaceholderText("Seu email")
		const passwordInput = await screen.findByPlaceholderText("Sua senha")
		const confirmPasswordInput = await screen.findByPlaceholderText(
			"Confirme sua senha"
		)

		await act(() => {
			fireEvent.changeText(usernameInput, mocks.user.username)
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, mocks.user.password)
			fireEvent.changeText(confirmPasswordInput, mocks.user.password)
		})
		await act(async () => {
			await fireEvent.press(screen.getByText("Criar conta"))
		})

		await waitFor(async () => {
			const emailInputError = await screen.findByText("Email já está em uso")
			expect(emailInputError).toBeTruthy()
		})
	})
})
