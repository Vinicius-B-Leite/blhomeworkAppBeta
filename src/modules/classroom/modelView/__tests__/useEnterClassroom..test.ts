import { renderHook, waitFor } from "@/testUtils"
import { useEnterClassroomModelView } from "../useEnterClassroom.modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"
import { getSubapaseClassroomError } from "@/modules/classroom/utils"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: mocks.user }),
}))

describe("modelView: useEnterClassroom", () => {
	it("should call onSuccess when enter enterClassroom success", async () => {
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue([
			{ ...mocks.classroomApiResponse[0] },
		])

		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useEnterClassroomModelView({ onSuccess, onError: jest.fn() })
		)

		result.current.enterClassroom({ classroomCode: "123" })

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})

	it("should call onError with handler error message when enter enterClassroom fails", async () => {
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "Classroom not found",
		})

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useEnterClassroomModelView({ onSuccess, onError })
		)

		result.current.enterClassroom({ classroomCode: "123" })

		await waitFor(() => expect(onError).toHaveBeenCalled())
		await waitFor(() =>
			expect(onSuccess).not.toHaveBeenCalledWith(
				getSubapaseClassroomError("Classroom not found")
			)
		)
	})

	it("should call onError without handler error message when enter enterClassroom fails", async () => {
		jest.spyOn(classroomApi, "enterClassroom").mockResolvedValue()
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValue({
			message: "some error",
		})

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useEnterClassroomModelView({ onSuccess, onError })
		)

		result.current.enterClassroom({ classroomCode: "123" })

		await waitFor(() => expect(onError).toHaveBeenCalledWith(null))
		await waitFor(() => expect(onSuccess).not.toHaveBeenCalled())
	})
})
