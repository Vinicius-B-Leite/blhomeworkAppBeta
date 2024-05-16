import { z } from "zod"

export const updateProfileSchema = z
	.object({
		username: z
			.string()
			.min(3, "Nome de usuário deve ter no mínimo 3 caracteres")
			.optional(),
		avatar: z.string().optional(),
		password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
		confirmPassword: z
			.string()
			.min(6, "Senha deve ter no mínimo 6 caracteres")
			.optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não são iguais",
		path: ["confirmPassword"],
	})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
