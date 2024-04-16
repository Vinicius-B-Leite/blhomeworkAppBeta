import { act, renderHook, waitFor } from "@/testUtils"
import { usePromoteStudentToClassroomAdmin } from "../usePromoteStudentToClassroomAdmin.modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"

describe("modelView: usePromoteStudentToClassroomAdmin", () => {
	it("should promote an student to classroom admin", async () => {
		jest.spyOn(classroomApi, "promoteStudentToClassroomAdmin").mockResolvedValue()

		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(
			mocks.studentsApiResponse[0]
		)

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() =>
			usePromoteStudentToClassroomAdmin({
				classroomId: "1",
				onSuccess,
				onError,
			})
		)

		await act(async () => {
			await result.current.promoteStudentToClassroomAdmin({ studentId: "1" })
		})

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalled()
			expect(onError).not.toHaveBeenCalled()
		})
	})

	it("should call onError with handler error message", async () => {
		jest.spyOn(classroomApi, "promoteStudentToClassroomAdmin").mockResolvedValue()

		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(null)
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(
			mocks.studentsApiResponse[0]
		)

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() =>
			usePromoteStudentToClassroomAdmin({
				classroomId: "1",
				onSuccess,
				onError,
			})
		)

		await act(async () => {
			await result.current.promoteStudentToClassroomAdmin({ studentId: "1" })
		})

		await waitFor(() => {
			expect(onSuccess).not.toHaveBeenCalled()
			expect(onError).toHaveBeenCalledWith("Código da sala inválido")
		})

		onError.mockClear()
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(null)

		await act(async () => {
			await result.current.promoteStudentToClassroomAdmin({ studentId: "1" })
		})

		await waitFor(() => {
			expect(onSuccess).not.toHaveBeenCalled()
			expect(onError).toHaveBeenCalledWith("Aluno não encontrado")
		})
	})

	it("should call onError with generic error message", async () => {
		jest.spyOn(classroomApi, "promoteStudentToClassroomAdmin").mockResolvedValue()

		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "random error",
		})
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(
			mocks.studentsApiResponse[0]
		)

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() =>
			usePromoteStudentToClassroomAdmin({
				classroomId: "1",
				onSuccess,
				onError,
			})
		)

		await act(async () => {
			await result.current.promoteStudentToClassroomAdmin({ studentId: "1" })
		})

		await waitFor(() => {
			expect(onSuccess).not.toHaveBeenCalled()
			expect(onError).toHaveBeenCalledWith("Erro ao promover aluno!")
		})
	})
})
