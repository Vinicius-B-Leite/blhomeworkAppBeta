import { renderHook, waitFor } from "@/testUtils"
import { useResetPasswordModelView } from "../useResetPassword.modelView"
import { authApi } from "@/modules/auth/api"

describe("modelView: useResetPassword", () => {
	it("should call onSuccess prop when mutation is successful", async () => {
		jest.spyOn(authApi, "sendEmailToResetPassword").mockResolvedValue()
		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useResetPasswordModelView({ onSuccess: onSuccess })
		)

		result.current.resetPassword({ email: "someemail@gmail.com" })

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalled()
		})
	})

	it("should call onError prop with errorMessage when mutation is unsuccessful", async () => {
		jest.spyOn(authApi, "sendEmailToResetPassword").mockRejectedValueOnce({
			message:
				"For security purposes, you can only request this once every 60 seconds",
		})
		const onError = jest.fn()
		const { result } = renderHook(() =>
			useResetPasswordModelView({ onError: onError })
		)

		result.current.resetPassword({ email: "somemail@gmail.com" })

		await waitFor(() => {
			expect(onError).toHaveBeenCalledWith({
				field: ["email"],
				message:
					"Por segurança, você só pode solicitar isso uma vez a cada 60 segundos",
			})
		})
	})
})
