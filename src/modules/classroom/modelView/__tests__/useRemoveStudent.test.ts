import { act, renderHook, waitFor } from "@/testUtils"
import { useRemoveStudentModelView } from "../useRemoveStudent.modelView"
import { classroomApi } from "../../api"

describe("modelView: useRemoveStudent", () => {
	it("should remove student from classroom and call onSuccess prop", async () => {
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue({
			user: {
				id: "studentId",
				user_name: "studentName",
				email: "studentEmail",
				avatar_url: "studentAvatar",
			},
		})
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue({
			admin_id: "adminId",
			id: "classroomId",
			name: "className",
			upload: null,
			created_at: "createdAt",
			updated_at: "updatedAt",
			deleted_at: "deletedAt",
		})
		jest.spyOn(classroomApi, "removeStudent").mockResolvedValue()

		const onSuccess = jest.fn()
		const classroomId = "classroomId"
		const studentId = "studentId"

		const { result } = renderHook(() =>
			useRemoveStudentModelView({
				classroomId,
				onSuccess,
			})
		)

		await act(async () => {
			await result.current.removeStudent({ studentId: studentId })
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})

	it("should call on error with null when it fails with unhandled error", async () => {
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue({
			user: {
				id: "studentId",
				user_name: "studentName",
				email: "studentEmail",
				avatar_url: "studentAvatar",
			},
		})
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "error",
		})
		jest.spyOn(classroomApi, "removeStudent").mockResolvedValue()

		const onError = jest.fn()
		const classroomId = "classroomId"
		const studentId = "studentId"

		const { result } = renderHook(() =>
			useRemoveStudentModelView({
				classroomId,
				onError,
			})
		)

		await act(async () => {
			await result.current.removeStudent({ studentId: studentId })
		})

		await waitFor(() => expect(onError).toHaveBeenCalledWith(null))
	})

	it("should call on error with handled message when classroom/user not founded", async () => {
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue({
			user: {
				id: "studentId",
				user_name: "studentName",
				email: "studentEmail",
				avatar_url: "studentAvatar",
			},
		})
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(null)
		jest.spyOn(classroomApi, "removeStudent").mockResolvedValue()

		const onError = jest.fn()
		const classroomId = "classroomId"
		const studentId = "studentId"

		const { result } = renderHook(() =>
			useRemoveStudentModelView({
				classroomId,
				onError,
			})
		)

		await act(async () => {
			await result.current.removeStudent({ studentId: studentId })
		})

		await waitFor(() =>
			expect(onError).toHaveBeenCalledWith({
				field: null,
				message: "Sala ou aluno não encontrado",
			})
		)
	})
})
