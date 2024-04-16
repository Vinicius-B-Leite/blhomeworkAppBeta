import { renderHook, waitFor } from "@/testUtils"
import { useEnterClassroomModelView } from "../useEnterClassroom.modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"
import { getSubapaseClassroomError } from "@/modules/classroom/utils"
import { useLeaveModelView } from "../useLeaveClassroom.modelView"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: mocks.user }),
}))

describe("modelView: useLeaveClassroom", () => {
	it("should call onSuccess when leave classroom success", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue({
			classroom: mocks.classroomApiResponse[0].classroom,
		})
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		jest.spyOn(classroomApi, "leaveClassroom").mockResolvedValue()

		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useLeaveModelView({ onSuccess, onError: jest.fn() })
		)

		result.current.leaveClassroom({
			classroomId: mocks.classroomApiResponse[0].classroom.id,
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})

	it("should call onError with error message if admin try leave and it has more than 1 student", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue({
			classroom: {
				...mocks.classroomApiResponse[0].classroom,
				admin_id: mocks.user.uid,
			},
		})
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		jest.spyOn(classroomApi, "leaveClassroom").mockResolvedValue()

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() => useLeaveModelView({ onSuccess, onError }))

		result.current.leaveClassroom({
			classroomId: mocks.classroomApiResponse[0].classroom.id,
		})

		await waitFor(() =>
			expect(onError).toHaveBeenCalledWith({
				field: null,
				message: "Promova outro aluno a administrador antes de sair da sala",
			})
		)
	})

	it("should delete classroom if it has only 1 student", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue({
			classroom: mocks.classroomApiResponse[0].classroom,
		})
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue([
			mocks.studentsApiResponse[0],
		])
		jest.spyOn(classroomApi, "leaveClassroom").mockResolvedValue()
		const mockDeleteClassroom = jest.fn()
		jest.spyOn(classroomApi, "deleteClassroom").mockImplementation(
			mockDeleteClassroom
		)

		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useLeaveModelView({ onSuccess, onError: jest.fn() })
		)

		result.current.leaveClassroom({
			classroomId: mocks.classroomApiResponse[0].classroom.id,
		})

		await waitFor(() => expect(mockDeleteClassroom).toHaveBeenCalled())
		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})
})
