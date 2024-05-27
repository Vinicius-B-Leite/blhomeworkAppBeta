import * as LocalAuthentication from "expo-local-authentication"
import { authenticate } from "../authenticate"

jest.mock("expo-local-authentication")

describe("authenticate", () => {
	it("calls LocalAuthentication.authenticateAsync with correct parameters", async () => {
		await authenticate()
		expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
			promptMessage: "Faça autenticação para salvar suas alteracões!",
			cancelLabel: "Cancelar",
			fallbackLabel: "Não reconhecido.",
		})
	})

	it("returns the correct value when LocalAuthentication.authenticateAsync resolves", async () => {
		const mockResult = { success: true, error: null }
		;(LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue(
			mockResult
		)
		const result = await authenticate()
		expect(result).toEqual(mockResult)
	})

	it("throws an error when LocalAuthentication.authenticateAsync rejects", async () => {
		const mockError = new Error("Authentication failed")
		;(LocalAuthentication.authenticateAsync as jest.Mock).mockRejectedValue(mockError)
		await expect(authenticate()).rejects.toThrow("Authentication failed")
	})
})
