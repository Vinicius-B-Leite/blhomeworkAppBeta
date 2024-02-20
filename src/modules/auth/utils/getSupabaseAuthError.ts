type Fields = "email" | "password"

export type SubapaseAuthError = {
	field: Fields[]
	message: string
} | null

export const authErrors: Record<string, { field: Fields[]; message: string }> = {
	"Invalid login credentials": {
		field: ["email", "password"],
		message: "Email ou senha inválido",
	},
	"User already registered": {
		field: ["email"],
		message: "Email já está em uso",
	},
	"For security purposes, you can only request this once every 60 seconds": {
		field: ["email"],
		message: "Por segurança, você só pode solicitar isso uma vez a cada 60 segundos",
	},
	"Email rate limit exceeded": {
		field: ["email"],
		message: "Limite de e-mail excedido",
	},
}
export const getSubapaseAuthError = (error: string): SubapaseAuthError => {
	const authErrosIncludesErrorProp = Object.keys(authErrors).includes(error)
	if (authErrosIncludesErrorProp) {
		const err = error as keyof typeof authErrors
		return { field: authErrors[err].field, message: authErrors[err].message }
	}
	return null
}
