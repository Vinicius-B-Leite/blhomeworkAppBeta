import { z } from "zod"

export const createTaskScreenSchema = z.object({
	title: z.string().trim().min(3, "Mínimo de 3 caracteres"),
	subject: z.object(
		{
			id: z.string(),
			name: z.string(),
			color: z.string(),
		},
		{ required_error: "Disciplina é obrigatória" }
	),
	description: z.string().trim().optional(),
	uploads: z
		.array(
			z.object({
				uri: z.string(),
				name: z.string(),
				base64: z.string(),
				extension: z.string(),
			})
		)
		.optional(),
	deadLine: z
		.date({ required_error: "Data de entrega é obrigatória" })
		.min(new Date(), "A data mínima é hoje"),
})

export type CreateTaskScreenSchema = z.infer<typeof createTaskScreenSchema>
