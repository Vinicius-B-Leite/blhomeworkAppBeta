import { act, renderHook, waitFor } from "@/testUtils"
import { useUpdateProfileModelView } from "../useUpdateProfile.modelView"

import { profileModelViewMocks } from "./__mocks__/profileModelViewMocks"
import { profileApi } from "../../api"
import { profileAdapert } from "../../models/profileAdapter"
import { api } from "@/api"

const mockUpdateUser = jest.fn()
const mockUser = profileModelViewMocks.user
jest.mock("@/modules/profile/utils/localAuthetication")
jest.mock("@/modules/auth/context", () => ({
	useAuth: () => ({
		user: mockUser,
		updateUser: mockUpdateUser,
	}),
}))
describe("modelView: useUpdateProfile", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should update just the name", async () => {
		const newName = "new name"
		jest.spyOn(
			require("@/modules/profile/utils"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(require("@/modules/profile/utils"), "authenticate").mockResolvedValue({
			success: true,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockResolvedValue()

		jest.spyOn(profileApi, "updateProfile").mockResolvedValue({
			...profileModelViewMocks.updatedMetadadosUser,
			user_name: newName,
		})

		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				username: newName,
			})
		})

		await waitFor(() => {
			expect(onError).not.toHaveBeenCalled()
			expect(onSuccess).toHaveBeenCalled()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				...profileAdapert.toUser({
					...profileModelViewMocks.updatedMetadadosUser,
					user_name: newName,
				}),
				refreshtoken: mockUser.refreshtoken,
				token: mockUser.token,
				uid: mockUser.uid,
			})
		})
	})
	it("should update just password", async () => {
		const newPassword = "123321123"
		jest.spyOn(
			require("@/modules/profile/utils"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(require("@/modules/profile/utils"), "authenticate").mockResolvedValue({
			success: true,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockResolvedValue()

		jest.spyOn(profileApi, "updateProfile").mockResolvedValue({
			...profileModelViewMocks.updatedMetadadosUser,
		})

		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				password: newPassword,
			})
		})

		await waitFor(() => {
			expect(onError).not.toHaveBeenCalled()
			expect(onSuccess).toHaveBeenCalled()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				...profileAdapert.toUser({
					...profileModelViewMocks.updatedMetadadosUser,
				}),
				refreshtoken: mockUser.refreshtoken,
				token: mockUser.token,
				uid: mockUser.uid,
			})
		})
	})
	it("should update just avatar", async () => {
		const newAvatar = "file://new-avatar.png``"
		jest.spyOn(
			require("@/modules/profile/utils/localAuthetication"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(
			require("@/modules/profile/utils/localAuthetication"),
			"authenticate"
		).mockResolvedValue({
			success: true,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockResolvedValue()

		jest.spyOn(profileApi, "updateProfile").mockResolvedValue({
			...profileModelViewMocks.updatedMetadadosUser,
			avatar_url: newAvatar,
		})
		jest.spyOn(api, "listFilesFromFolder").mockResolvedValue(
			profileModelViewMocks.listFilesResponse
		)
		jest.spyOn(api, "removeFiles").mockResolvedValue()
		jest.spyOn(api, "uploadFile").mockResolvedValue({
			downloadUrl: newAvatar,
			type: "png",
		})

		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				avatarUrl: newAvatar,
				base64: "base64",
			})
		})

		await waitFor(() => {
			expect(onError).not.toHaveBeenCalled()
			expect(onSuccess).toHaveBeenCalled()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				...profileAdapert.toUser({
					...profileModelViewMocks.updatedMetadadosUser,
					avatar_url: newAvatar,
				}),
				refreshtoken: mockUser.refreshtoken,
				token: mockUser.token,
				uid: mockUser.uid,
			})
		})
	})
	it("should update all profile data", async () => {
		const newAvatar = "https://new-avatar.com.png"
		const newUsername = "new name"
		const newPassword = "123321123"

		jest.spyOn(
			require("@/modules/profile/utils"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(require("@/modules/profile/utils"), "authenticate").mockResolvedValue({
			success: true,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockResolvedValue()

		jest.spyOn(profileApi, "updateProfile").mockResolvedValue({
			...profileModelViewMocks.updatedMetadadosUser,
			avatar_url: newAvatar,
			user_name: newUsername,
		})
		jest.spyOn(api, "listFilesFromFolder").mockResolvedValue(
			profileModelViewMocks.listFilesResponse
		)
		jest.spyOn(api, "removeFiles").mockResolvedValue()
		jest.spyOn(api, "uploadFile").mockResolvedValue({
			downloadUrl: newAvatar,
			type: "png",
		})

		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				avatarUrl: newAvatar,
				base64: "base64",
				password: newPassword,
				username: newUsername,
			})
		})

		await waitFor(() => {
			expect(onError).not.toHaveBeenCalled()
			expect(onSuccess).toHaveBeenCalled()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				...profileAdapert.toUser({
					...profileModelViewMocks.updatedMetadadosUser,
					avatar_url: newAvatar,
					user_name: newUsername,
				}),
				refreshtoken: mockUser.refreshtoken,
				token: mockUser.token,
				uid: mockUser.uid,
			})
		})
	})
	it("should call onError with null  if error NOT handler", async () => {
		const newName = "new name"
		jest.spyOn(
			require("@/modules/profile/utils/localAuthetication"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(
			require("@/modules/profile/utils/localAuthetication"),
			"authenticate"
		).mockResolvedValue({
			success: true,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockRejectedValue({ message: "error" })

		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				username: newName,
			})
		})

		await waitFor(() => {
			expect(onError).toHaveBeenCalledWith(null)
			expect(onSuccess).not.toHaveBeenCalled()
		})
	})
	it("should call onError with error messa if it is handler", async () => {
		const newName = "new name"
		jest.spyOn(
			require("@/modules/profile/utils"),
			"canUseLocalAuthentication"
		).mockResolvedValue(true)
		jest.spyOn(require("@/modules/profile/utils"), "authenticate").mockResolvedValue({
			success: false,
		})
		jest.spyOn(profileApi, "refreshSeassion").mockResolvedValue()

		jest.spyOn(profileApi, "updateProfile").mockResolvedValue({
			...profileModelViewMocks.updatedMetadadosUser,
			user_name: newName,
		})
		const onError = jest.fn()

		const onSuccess = jest.fn()
		const { result } = renderHook(() =>
			useUpdateProfileModelView({
				onError,
				onSuccess,
			})
		)

		await act(async () => {
			result.current.updateProfile({
				username: newName,
			})
		})

		await waitFor(() => {
			expect(onError).toHaveBeenCalledWith({
				field: null,
				message: "Autenticação local falhou",
			})
			expect(onSuccess).not.toHaveBeenCalled()
		})
	})
})
