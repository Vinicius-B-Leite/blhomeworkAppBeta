import { z } from "zod"

export const singupScreenSchema = z.object({
	username: z.string().min(3, "Nome de usuário deve ter no mínimo 3 caracteres"),
	email: z.string().email("Email inválido"),
	passwords: z
		.object({
			password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
			confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "As senhas não são iguais",
			path: ["confirmPassword"],
		}),
})

export type SingupScreenSchema = z.infer<typeof singupScreenSchema>
