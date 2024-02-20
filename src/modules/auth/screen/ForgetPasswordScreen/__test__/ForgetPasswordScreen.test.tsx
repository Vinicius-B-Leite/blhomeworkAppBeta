import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { ForgetPasswordScreen } from "../ForgetPasswordScreen"
import { AuthRoutes } from "@/modules/auth/routes"
import { authApi } from "@/modules/auth/api"

describe("integration: ForgetPasswordScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	it("should show an error message if unsuccess", async () => {
		jest.spyOn(authApi, "sendEmailToResetPassword").mockRejectedValue({
			message: "Email rate limit exceeded",
		})
		renderScreen(<AuthRoutes initialRoute="LoginScreen" />)

		const email = "somemail@gmail.com"

		await act(() => {
			fireEvent.changeText(screen.getByPlaceholderText("Email"), email)
			fireEvent.press(screen.getByText("Esqueci a senha"))
		})
		await act(() => {
			fireEvent.press(screen.getByText("Receber email"))
		})

		await waitFor(() => {
			expect(screen.getByText("Limite de e-mail excedido")).toBeTruthy()
		})

		jest.spyOn(authApi, "sendEmailToResetPassword").mockRejectedValue({
			message: "Random error",
		})
		await act(() => {
			fireEvent.press(screen.getByText("Receber email"))
		})
		await waitFor(() => {
			expect(screen.getByText("Algo deu errado. Tente novamente.")).toBeTruthy()
		})
	})
	it("should render with email of login", async () => {
		jest.spyOn(authApi, "sendEmailToResetPassword").mockRejectedValue({
			message: "Email rate limit exceeded",
		})
		renderScreen(<AuthRoutes initialRoute="LoginScreen" />)

		const email = "somemail@gmail.com"

		await act(() => {
			fireEvent.changeText(screen.getByPlaceholderText("Email"), email)
			fireEvent.press(screen.getByText("Esqueci a senha"))
		})

		await waitFor(() => {
			expect(screen.getByTestId("emailInput").props.value).toBe(email)
		})
	})
	it("should show a success message if success", async () => {
		jest.spyOn(authApi, "sendEmailToResetPassword").mockResolvedValue()
		renderScreen(<AuthRoutes initialRoute="LoginScreen" />)

		const email = "someone@gmail.com"

		await act(() => {
			fireEvent.changeText(screen.getByPlaceholderText("Email"), email)
			fireEvent.press(screen.getByText("Esqueci a senha"))
		})
		await act(() => {
			fireEvent.changeText(screen.getByPlaceholderText("Email"), email)
			fireEvent.press(screen.getByText("Receber email"))
		})
		await waitFor(() => {
			expect(screen.getByText("E-mail enviado com sucesso")).toBeTruthy()
		})
	})
})
