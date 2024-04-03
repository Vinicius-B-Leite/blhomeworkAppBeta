import { renderHook, waitFor } from "@/testUtils"
import { useCreateClassroom } from "@/modules/classroom/modelView"
import { classroomApi } from "@/modules/classroom/api"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: { uid: "uid" } }),
}))

jest.mock("@/utils", () => ({
	...jest.requireActual("@/utils"),
	convertUriToBase64: jest.fn().mockResolvedValue("base64"),
}))
describe("modelView: useCreateClassroom", () => {
	it("should create classroom with banner and call onSuccess", async () => {
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue()
		const mockOnSuccess = jest.fn()
		const { result } = renderHook(() =>
			useCreateClassroom({
				onError: (err) => console.log(err),
				onSuccess: mockOnSuccess,
			})
		)

		result.current.createClassroom({
			name: "Classroom Name",
			bannerUri: "uri",
		})

		await waitFor(() => expect(mockOnSuccess).toHaveBeenCalled())
	})
	it("should create classroom without banner and call onSuccess", async () => {
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue()
		const mockOnSuccess = jest.fn()
		const { result } = renderHook(() =>
			useCreateClassroom({
				onError: (err) => console.log(err),
				onSuccess: mockOnSuccess,
			})
		)

		result.current.createClassroom({
			name: "Classroom Name",
		})

		await waitFor(() => expect(mockOnSuccess).toHaveBeenCalled())
	})

	it("should call onError when create classroom fails", async () => {
		jest.spyOn(classroomApi, "createClassroom").mockRejectedValue({
			message: "error",
		})
		const mockOnError = jest.fn()
		const { result } = renderHook(() =>
			useCreateClassroom({
				onError: mockOnError,
			})
		)

		result.current.createClassroom({
			name: "Classroom Name",
		})

		await waitFor(() => expect(mockOnError).toHaveBeenCalledWith("error"))
	})
})
