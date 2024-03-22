import { act, renderHook, waitFor } from "@/testUtils"
import { useupdateSubject } from "../useUpdateSubject.modelView"
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

describe("modelView: useUpdateSubject", () => {
	it("should update subject, call onSuccess and refetch subject list", async () => {
		jest.spyOn(taskApi, "updateSubject").mockResolvedValue({
			color_rgb: "rgb(255, 0, 0)",
			id: "subjectId",
			title: "math",
			short_name: "mat",
		})

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useupdateSubject({
				classroomId: "classroomId",
				onSuccess,
				onError: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.updateSubject({
				subject: {
					id: "subjectId",
					name: "math",
					shortName: "mat",
					color: "rgb(255, 0, 0)",
				},
			})
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
		await waitFor(() => expect(mockinvalidateQueries).toHaveBeenCalled())
	})

	it("should call on erro when it has error", async () => {
		jest.spyOn(taskApi, "updateSubject").mockRejectedValue({ message: "error" })
		const onError = jest.fn()

		const { result } = renderHook(() =>
			useupdateSubject({
				classroomId: "classroom1",
				onError,
				onSuccess: jest.fn(),
			})
		)

		await act(async () => {
			await result.current.updateSubject({
				subject: {
					id: "subjectId",
					name: "math",
					shortName: "mat",
					color: "rgb(255, 0, 0)",
				},
			})
		})
		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
