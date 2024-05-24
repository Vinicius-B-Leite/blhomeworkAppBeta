type Fields = "username" | "avatarUrl" | "password"

export type SubapaseProfileError = {
	field: Fields[] | null
	message: string
} | null

export const profileErrors: Record<string, { field: Fields[] | null; message: string }> =
	{
		"Auth session missing!": {
			field: null,
			message: "Sessão ausente! Faça login novamente.",
		},
		"Local authentication failed": {
			field: null,
			message: "Autenticação local falhou",
		},
	}
export const getSubapaseProfileError = (error: string): SubapaseProfileError => {
	const profileErrosIncludesErrorProp = Object.keys(profileErrors).includes(error)
	if (profileErrosIncludesErrorProp) {
		const err = error as keyof typeof profileErrors
		return { field: profileErrors[err].field, message: profileErrors[err].message }
	}
	return null
}
