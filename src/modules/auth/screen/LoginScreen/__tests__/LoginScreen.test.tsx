import { act, fireEvent, render, renderScreen, screen } from "@/testUtils"
import { LoginScreen } from "../LoginScreen"

describe("integration: LoginScreen", () => {
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
})
