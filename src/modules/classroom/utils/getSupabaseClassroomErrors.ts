type Fields = "classroomCode"

export type SubapaseClassroomError = {
	field: Fields[]
	message: string
} | null

export const classroomErrors: Record<string, { field: Fields[]; message: string }> = {
	"Classroom not found": {
		field: ["classroomCode"],
		message: "Código da sala inválido",
	},
}
export const getSubapaseClassroomError = (error: string): SubapaseClassroomError => {
	const isErrorPropsInClassroomErrors = Object.keys(classroomErrors).includes(error)
	if (isErrorPropsInClassroomErrors) {
		const err = error as keyof typeof classroomErrors
		return {
			field: classroomErrors[err].field,
			message: classroomErrors[err].message,
		}
	}
	return null
}
