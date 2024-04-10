import { act, renderHook, waitFor } from "@/testUtils"
import { useLogoutModelView } from "../useLogout.modelView"

const mockLogout = jest.fn()

jest.mock("@/modules/auth/context", () => ({
	useAuth: () => ({
		logout: mockLogout,
	}),
}))

describe("modelView: useLogout", () => {
	it("should logout and it calls onSuccess correctly", async () => {
		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useLogoutModelView({
				onSuccess,
			})
		)

		await act(async () => {
			result.current.logout()
		})

		await waitFor(() => expect(mockLogout).toHaveBeenCalledTimes(1))
	})
})
