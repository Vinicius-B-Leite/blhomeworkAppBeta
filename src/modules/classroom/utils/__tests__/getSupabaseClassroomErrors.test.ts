import { getSubapaseClassroomError, classroomErrors } from "../getSupabaseClassroomErrors"

describe("classroomUtils: getSubapaseClassroomError", () => {
	it("should return the correct error when the error string matches a key in classroomErrors", () => {
		const errors = Object.keys(classroomErrors)

		errors.forEach((error) => {
			const result = getSubapaseClassroomError(error)
			expect(result).toEqual(classroomErrors[error])
		})
	})

	it("should return null when the error string does not match any key in classroomErrors", () => {
		const error = "Some other error"
		const result = getSubapaseClassroomError(error)
		expect(result).toBeNull()
	})
})
