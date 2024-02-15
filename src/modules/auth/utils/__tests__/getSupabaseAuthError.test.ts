import { authErrors } from "../getSupabaseAuthError"

describe("authUtils: getSupabaseAuthError ", () => {
	it('should have "Invalid login credentials" key', () => {
		expect(authErrors).toHaveProperty("Invalid login credentials")
	})

	it('should have correct value for "Invalid login credentials" key', () => {
		expect(authErrors["Invalid login credentials"]).toEqual({
			field: ["email", "password"],
			message: "Email ou senha inválido",
		})
	})

	it('should have "User already registered" key', () => {
		expect(authErrors).toHaveProperty("User already registered")
	})

	it('should have correct value for "User already registered" key', () => {
		expect(authErrors["User already registered"]).toEqual({
			field: ["email"],
			message: "Email já está em uso",
		})
	})
})
