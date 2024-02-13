import { renderHook, waitFor } from "@/testUtils"
import { useSingUpModelView } from "../useSingUp.modelView"

import { AuthResponse, UserType } from "@/modules/auth/models"
import { authApi } from "@/modules/auth/api"

const user: UserType = {
	email: "fake-email",
	refreshtoken: "fake-resfresh-token",
	token: "fake-token",
	uid: "fake-uid",
	username: "fake-username",
}

describe("modelView: useSingUpModelView", () => {
	it("should calls onSuccess when mutation is successful", async () => {
		jest.spyOn(authApi, "singUp").mockResolvedValue({
			session: {
				access_token: user.token,
				expires_at: 123123123,
				expires_in: 123123123,
				refresh_token: user.refreshtoken,
				token_type: "fake-token",
				//@ts-ignore
				user: {
					user_metadata: {
						username: user.username,
					},
					email: user.email,
					id: user.uid,
				},
			},
		})
		const onSuccess = jest.fn()
		const { result } = renderHook(() => useSingUpModelView({ onSucess: onSuccess }))

		await result.current.handleSingUp({
			email: user.email,
			password: "123123123",
			username: user.username,
		})

		await waitFor(() => expect(onSuccess).toHaveBeenCalled())
	})
	it("should calls onError when mutation is error", async () => {
		jest.spyOn(authApi, "singUp").mockRejectedValue({ message: "some error" })
		const onError = jest.fn()
		const { result } = renderHook(() => useSingUpModelView({ onError: onError }))

		await result.current.handleSingUp({
			email: user.email,
			password: "123",
			username: user.username,
		})

		await waitFor(() => expect(onError).toHaveBeenCalled())
	})
})
