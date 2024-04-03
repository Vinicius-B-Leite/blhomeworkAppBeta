import { z } from "zod"

export const UpsertClassroomScreenSchema = z.object({
	bannerUri: z
		.object({
			uri: z.string(),
			base64: z.string(),
		})
		.optional(),
	classroomName: z.string().min(3, "Mínimo de 3 caracteres"),
})

export type UpsertClassroomScreenSchema = z.infer<typeof UpsertClassroomScreenSchema>
