import { act, renderHook, waitFor } from "@/testUtils"
import { useCreateSubject } from "../useCreateSubject.modelView"
import { taskApi } from "@/modules/task/api"

const mockinvalidateQueries = jest.fn()
jest.mock("@tanstack/react-query", () => {
	const originalModule = jest.requireActual("@tanstack/react-query")
	return {
		...originalModule,
		useQueryClient: () => ({
			invalidateQueries: mockinvalidateQueries,
		}),
	}
})
describe("modelView: useCreateSubjectModelView", () => {
	it("should create a new subject and call onSuccess and update subject list", async () => {
		const mockSubject = {
			name: "subject1",
			color: "red",
			shortName: "s1",
		}

		jest.spyOn(taskApi, "createSubject").mockResolvedValue({
			color_rgb: mockSubject.color,
			id: "subject1",
			short_name: mockSubject.shortName,
			title: mockSubject.name,
		})
		const onSuccess = jest.fn()

		const { result } = renderHook(() =>
			useCreateSubject({
				classroomId: "classroom1",
				onError: jest.fn(),
				onSuccess,
			})
		)

		await act(async () => {
			await result.current.createSubject({
				classroomId: "classroom1",
				subject: {
					name: mockSubject.name,
					color: mockSubject.color,
					shortName: mockSubject.shortName,
				},
			})
		})
		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
		await waitFor(() => expect(mockinvalidateQueries).toHaveBeenCalled())
	})

	it("should call on erro when it has error", async () => {
		jest.spyOn(taskApi, "createSubject").mockRejectedValue({ message: "error" })
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useCreateSubject({
				classroomId: "classroom1",
				onError,
				onSuccess: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.createSubject({
				classroomId: "classroom1",
				subject: {
					name: "subject1",
					color: "red",
					shortName: "s1",
				},
			})
		})
		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
