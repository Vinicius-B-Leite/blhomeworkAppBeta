import { act, renderHook, waitFor } from "@/testUtils"
import { useEnterClassroomModelView } from "../useEnterClassroom.modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"
import { getSubapaseClassroomError } from "@/modules/classroom/utils"
import { useUpdateClassroom } from "../useUpdateClassroom.modelView"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: mocks.user }),
}))

jest.mock("@/utils", () => ({
	...jest.requireActual("@/utils"),
	convertUriToBase64: jest.fn().mockResolvedValue("base64"),
}))

describe("modelView: useUpdateClassroom", () => {
	it("should call onSuccess when update classroom (with name and banner) success", async () => {
		jest.spyOn(classroomApi, "updateClassroom").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({
			id: "123",
		})

		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useUpdateClassroom({ onSuccess, onError: jest.fn() })
		)

		await act(async () => {
			await result.current.updateClassroom({
				name: "name",
				bannerUri: "file://path/to/image.png",
				classroomId: "classroomId",
			})
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})
	it("should call onSuccess when update classroom (without banner) success", async () => {
		jest.spyOn(classroomApi, "updateClassroom").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)

		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useUpdateClassroom({ onSuccess, onError: jest.fn() })
		)

		await act(async () => {
			await result.current.updateClassroom({
				name: "name",
				classroomId: "classroomId",
			})
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})

	it("should call onError with handler error message when enter enterClassroom fails", async () => {
		jest.spyOn(classroomApi, "updateClassroom").mockRejectedValue({
			message: "Error on update classroom",
		})
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({
			id: "123",
		})

		const onSuccess = jest.fn()
		const onError = jest.fn()

		const { result } = renderHook(() => useUpdateClassroom({ onSuccess, onError }))

		result.current.updateClassroom({
			name: "name",
			bannerUri: "123",
			classroomId: "classroomId",
		})

		await waitFor(() => expect(onError).toHaveBeenCalled())
		await waitFor(() =>
			expect(onSuccess).not.toHaveBeenCalledWith(
				getSubapaseClassroomError("Error on update classroom")
			)
		)
	})
})
