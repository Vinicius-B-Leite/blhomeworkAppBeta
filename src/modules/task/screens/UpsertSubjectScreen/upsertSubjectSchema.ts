import { z } from "zod"

export const rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
export const createSubjectSchema = z.object({
	name: z.string().trim().min(3, "Mínimo de 3 caracteres"),
	color: z
		.string()
		.min(4, "Mínimo de 4 caracteres")
		.refine((color) => rgbColorRegex.test(color), {
			message: "Cor deve ser RGB. Ex: rgb(255, 255, 255)",
		}),
	shortName: z
		.string()
		.trim()
		.min(3, "Deve ter 3 caracteres")
		.max(3, "Deve tr 3 caracteres"),
})

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>
