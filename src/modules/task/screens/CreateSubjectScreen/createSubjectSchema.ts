import { z } from "zod"

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
export const createSubjectSchema = z.object({
	name: z.string().min(3, "Mínimo de 3 caracteres"),
	color: z
		.string()
		.min(4, "Mínimo de 4 caracteres")
		.transform((color) => color.toUpperCase())
		.refine((color) => hexColorRegex.test(color), {
			message: "Cor deve ser hexadecimal. Ex: #FF0000",
		}),
	shortName: z.string().min(3, "Deve ter 3 caracteres").max(3, "Deve tr 3 caracteres"),
})

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>
