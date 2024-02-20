import { z } from "zod"

export const ForgetPasswordScreenSchema = z.object({
	email: z.string().email("Informe um email válido!"),
})

export type ForgetPasswordScreenSchema = z.infer<typeof ForgetPasswordScreenSchema>
