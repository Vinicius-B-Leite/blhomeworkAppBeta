import { act, renderHook, waitFor } from "@/testUtils"
import { useLoginWithEmail } from "../useLoginWithEmail.modelView"
import { authApi } from "@/modules/auth/api"
import { mocks } from "./__mocks__/modelViewMocks"
import { authErrors } from "@/modules/auth/utils"

const mockedUpdateUser = jest.fn()
jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		updateUser: mockedUpdateUser,
	}),
}))
describe("modelView: useLoginWithEmail", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should call onSuccess prop and updateUser when it is successful", async () => {
		jest.spyOn(authApi, "loginWithEmail").mockResolvedValue(mocks.loginMock)
		const mockOnSuccess = jest.fn()
		const { result } = renderHook(() =>
			useLoginWithEmail({ onSuccess: mockOnSuccess })
		)

		await result.current.loginWithEmail({
			email: mocks.user.email,
			password: "password",
		})

		await waitFor(() => {
			expect(mockedUpdateUser).toHaveBeenCalled()
			expect(mockOnSuccess).toHaveBeenCalledWith(mocks.user)
		})
	})

	it("should call onError prop  when it is failed", async () => {
		jest.spyOn(authApi, "loginWithEmail").mockRejectedValueOnce({
			message: "Some error",
		})
		const mockOnError = jest.fn()
		const { result } = renderHook(() => useLoginWithEmail({ onError: mockOnError }))

		result.current.loginWithEmail({
			email: mocks.user.email,
			password: "password",
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith(null)
			expect(mockedUpdateUser).not.toHaveBeenCalled()
		})

		jest.spyOn(authApi, "loginWithEmail").mockRejectedValueOnce({
			message: "Invalid login credentials",
		})
		result.current.loginWithEmail({
			email: mocks.user.email,
			password: "password",
		})
		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith(
				authErrors["Invalid login credentials"]
			)
			expect(mockedUpdateUser).not.toHaveBeenCalled()
		})
	})
})
