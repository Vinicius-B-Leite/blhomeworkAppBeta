import { act, renderHook, waitFor } from "@/testUtils"
import { useDeleteSubject } from "../useDeleteSubject.modelView"
import { taskApi } from "../../api"

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

describe("modelView: useDeleteSubject", () => {
	it("should delete subject, call onSuccess and refetch subject list", async () => {
		jest.spyOn(taskApi, "deltedSubject").mockResolvedValue()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useDeleteSubject({
				classroomId: "classroomId",
				onSuccess,
				onError: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.deleteSubject({ subjectId: "subjectId" })
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
		await waitFor(() => expect(mockinvalidateQueries).toHaveBeenCalled())
	})

	it("should call on erro when it has error", async () => {
		jest.spyOn(taskApi, "deltedSubject").mockRejectedValue({ message: "error" })
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useDeleteSubject({
				classroomId: "classroom1",
				onError,
				onSuccess: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.deleteSubject({
				subjectId: "subject1",
			})
		})
		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
