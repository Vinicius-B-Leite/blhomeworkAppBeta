import { z } from "zod"

export const loginScreenSchema = z.object({
	email: z.string().email("Informe um email válido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type LoginScreenSchema = z.infer<typeof loginScreenSchema>
