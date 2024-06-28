import { renderHook, waitFor } from "@/testUtils"
import { useCreateClassroom } from "@/modules/classroom/modelView"
import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classrooModelViewMocks"
import { taskApi } from "@/modules/task/api"
import { chatApi } from "@/modules/chat/api"

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({ user: { uid: "uid" } }),
}))

jest.mock("@/utils", () => ({
	...jest.requireActual("@/utils"),
	convertUriToBase64: jest.fn().mockResolvedValue("base64"),
}))
describe("modelView: useCreateClassroom", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should create classroom without banner and call onSuccess", async () => {
		jest.spyOn(chatApi, "createChat").mockResolvedValue()
		jest.spyOn(taskApi, "createSubject").mockResolvedValue(mocks.subjectApiResponse)
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
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
	it("should create classroom with banner and call onSuccess", async () => {
		jest.spyOn(chatApi, "createChat").mockResolvedValue()

		const createSubject = jest
			.spyOn(taskApi, "createSubject")
			.mockResolvedValue(mocks.subjectApiResponse)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue(
			mocks.classroomApiResponse[0]
		)
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
		await waitFor(() => expect(createSubject).toHaveBeenCalledTimes(2))
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
