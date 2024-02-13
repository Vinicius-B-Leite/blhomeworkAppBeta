export type SingUpErrorreturn = {
	field: "email"
	message: string
} | null

export const getSupabeSingUpErrorMessage = (error: string): SingUpErrorreturn => {
	if (error === "User already registered") {
		return { field: "email", message: "Email já está em uso" }
	}
	return null
}
