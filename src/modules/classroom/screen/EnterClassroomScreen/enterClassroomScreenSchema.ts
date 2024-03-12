import { z } from "zod"

export const enterClassroomScreenSchema = z.object({
	code: z.string().min(1, "Mínimo de 1 caractere"),
})

export type EnterClassroomScreenSchema = z.infer<typeof enterClassroomScreenSchema>
