import { z } from "zod"

export const createClassroomScreenSchema = z.object({
	bannerUri: z
		.object({
			uri: z.string(),
			base64: z.string(),
		})
		.optional(),
	classroomName: z.string().min(3, "Mínimo de 3 caracteres"),
})

export type CreateClassroomScreenSchema = z.infer<typeof createClassroomScreenSchema>
