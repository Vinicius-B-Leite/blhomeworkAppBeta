import { z } from "zod"

export const singupScreenSchema = z.object({
	username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
	email: z.string().email("Email informado não é válido"),
	passwords: z
		.object({
			password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
			confirmPassword: z
				.string()
				.min(6, "A senha deve ter pelo menos 6 caracteres"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "As senhas não são iguais",
			path: ["confirmPassword"],
		}),
})

export type SingupScreenSchema = z.infer<typeof singupScreenSchema>
