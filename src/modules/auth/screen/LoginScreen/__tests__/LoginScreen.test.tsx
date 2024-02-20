import {
	act,
	fireEvent,
	render,
	renderScreen,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@/testUtils"
import { LoginScreen } from "../LoginScreen"
import { authApi } from "@/modules/auth/api"
import { mocks } from "./__mocks__/loginScreenMocks"
import { authErrors } from "@/modules/auth/utils"
import { authStorage } from "@/modules/auth/storage"
import { UserType } from "@/modules/auth/models"

describe("integration: LoginScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should show error message if has some error validation on form", async () => {
		renderScreen(<LoginScreen />)

		const passwordInput = screen.getByPlaceholderText("****")
		await act(() => fireEvent.changeText(passwordInput, "12345"))
		expect(screen.getByText("A senha deve ter no mínimo 6 caracteres")).toBeTruthy()

		const emailInput = screen.getByPlaceholderText("Email")
		await act(() => fireEvent.changeText(emailInput, "invalid-email"))
		expect(screen.getByText("Informe um email válido")).toBeTruthy()

		expect(screen.getByText("Entrar")).toBeDisabled()
	})
	it("should show error toast if has some erro on api that it was NOT handler", async () => {
		jest.spyOn(authApi, "loginWithEmail").mockRejectedValue({ message: "Some error" })
		renderScreen(<LoginScreen />)

		const emailInput = screen.getByPlaceholderText("Email")
		const passwordInput = screen.getByPlaceholderText("****")

		await act(() => {
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, "123123")
		})

		await act(() => {
			fireEvent.press(screen.getByText("Entrar"))
		})

		await waitFor(() => {
			expect(screen.getByText("Error ao realizar login!")).toBeTruthy()
		})
	})
	it("should show input error if has some erro on api that it was handler", async () => {
		jest.spyOn(authApi, "loginWithEmail").mockRejectedValue({
			message: "Invalid login credentials",
		})
		renderScreen(<LoginScreen />)

		const emailInput = screen.getByPlaceholderText("Email")
		const passwordInput = screen.getByPlaceholderText("****")

		await act(() => {
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, "123123")
		})

		await act(() => {
			fireEvent.press(screen.getByText("Entrar"))
		})

		await waitFor(() => {
			expect(screen.getAllByText("Email ou senha inválido")).toBeTruthy()
		})
	})
	it("should can login with valid credentials", async () => {
		const mockedUpdateUser = jest.fn()
		jest.spyOn(authStorage, "updateUser").mockImplementation(mockedUpdateUser)
		jest.spyOn(authApi, "loginWithEmail").mockResolvedValue(mocks.loginMock)
		renderScreen(<LoginScreen />)

		const emailInput = screen.getByPlaceholderText("Email")
		const passwordInput = screen.getByPlaceholderText("****")

		await act(() => {
			fireEvent.changeText(emailInput, mocks.user.email)
			fireEvent.changeText(passwordInput, "123123")
		})

		await act(async () => {
			await fireEvent.press(screen.getByText("Entrar"))
		})

		const expectedUser: UserType = {
			email: mocks.user.email,
			refreshtoken: mocks.user.refreshtoken,
			token: mocks.user.token,
			uid: mocks.user.uid,
			username: mocks.user.username,
			avatarUrl: mocks.user.avatarUrl,
		}
		await waitFor(() => expect(mockedUpdateUser).toHaveBeenCalledWith(expectedUser))
	})
})
