import { act, fireEvent, render, screen } from "@/testUtils"
import { SingUpScreen } from "../SingUpScreen"

jest.mock("@supabase/supabase-js", () => {
	return {
		createClient: jest.fn().mockImplementation(() => {
			return {
				auth: {
					signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
				},
			}
		}),
	}
})

describe("integration: SingUpScreen", () => {
	it("should show all validations", async () => {
		render(<SingUpScreen />)

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
})
