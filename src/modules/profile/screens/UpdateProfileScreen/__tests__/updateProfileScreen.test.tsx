import { act, fireEvent, renderScreen, screen } from "@/testUtils"
import { UpdateProfileScreen } from "../UpdateProfileScreen"
import { authStorage } from "@/modules/auth/storage"
import { updateProfileMock } from "./__mocks__/updateProfileScreenMocks"
import { profileApi } from "@/modules/profile/api"
import { api } from "@/api"

jest.mock("@/utils/pickImage")
jest.mock("@/modules/profile/utils/localAuthetication")
const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual<object>("@react-navigation/native"),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}))
describe("integration: UpdateProfileScreen", () => {
	it("should show error message when update profile fails", async () => {
		const newAvatar = "file:///B38919D3-3937-453E-A52C-35CB7606A268.jpg"

		jest.spyOn(require("@/utils/pickImage"), "pickImage").mockResolvedValue({
			uri: newAvatar,
			base64: "base64",
		})
		jest.spyOn(authStorage, "getUser").mockResolvedValue(updateProfileMock.user)
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

		jest.spyOn(profileApi, "updateProfile").mockRejectedValue({
			message: "error",
		})
		jest.spyOn(api, "listFilesFromFolder").mockResolvedValue(
			updateProfileMock.listFilesResponse
		)
		jest.spyOn(api, "removeFiles").mockResolvedValue()
		jest.spyOn(api, "uploadFile").mockResolvedValue({
			downloadUrl: newAvatar,
			type: "png",
		})
		renderScreen(<UpdateProfileScreen />)

		const avatarInput = await screen.findByTestId("avatar-image")
		await act(async () => {
			await fireEvent.press(avatarInput)
		})

		const submitButton = await screen.findByText("Salvar")
		await act(async () => {
			await fireEvent.press(submitButton)
		})

		expect(
			await screen.findByText("Ocorreu um erro ao atualizar o perfil!")
		).toBeTruthy()
		expect(mockNavigate).not.toHaveBeenCalledWith("ProfileRoutes", {
			screen: "Profile",
		})
	})
	it("should show form error if name lengh less than 3", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(updateProfileMock.user)
		renderScreen(<UpdateProfileScreen />)

		const usrenameInput = await screen.findByPlaceholderText(
			updateProfileMock.user.username
		)
		fireEvent.changeText(usrenameInput, "a")

		expect(
			await screen.findByText("Nome de usuário deve ter no mínimo 3 caracteres")
		).toBeTruthy()
	})

	it("should show form password validation errors", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(updateProfileMock.user)
		renderScreen(<UpdateProfileScreen />)

		const passwordInput = await screen.findByPlaceholderText("Nova senha")
		const confirmPasswordInput = await screen.findByPlaceholderText(
			"Confirme a nova senha"
		)

		await act(() => {
			fireEvent.changeText(passwordInput, "a1")
		})
		expect(
			await screen.findByText("Senha deve ter no mínimo 6 caracteres")
		).toBeTruthy()

		await act(() => {
			fireEvent.changeText(passwordInput, "123456")
		})
		expect(
			await screen.queryByText("Senha deve ter no mínimo 6 caracteres")
		).not.toBeTruthy()

		await act(() => {
			fireEvent.changeText(confirmPasswordInput, "123")
		})
		expect(
			await screen.queryByText("Senha deve ter no mínimo 6 caracteres")
		).toBeTruthy()
		await act(() => {
			fireEvent.changeText(confirmPasswordInput, "123123")
		})
		expect(await screen.queryByText("As senhas não são iguais")).toBeTruthy()
		await act(() => {
			fireEvent.changeText(confirmPasswordInput, "123456")
		})
		expect(await screen.queryByText("As senhas não são iguais")).not.toBeTruthy()
	})

	it("should show success message when update profile", async () => {
		const newAvatar = "file:///B38919D3-3937-453E-A52C-35CB7606A268.jpg"

		jest.spyOn(require("@/utils/pickImage"), "pickImage").mockResolvedValue({
			uri: newAvatar,
			base64: "base64",
		})
		jest.spyOn(authStorage, "getUser").mockResolvedValue(updateProfileMock.user)
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
			...updateProfileMock.updatedMetadadosUser,
			avatar_url: newAvatar,
		})
		jest.spyOn(api, "listFilesFromFolder").mockResolvedValue(
			updateProfileMock.listFilesResponse
		)
		jest.spyOn(api, "removeFiles").mockResolvedValue()
		jest.spyOn(api, "uploadFile").mockResolvedValue({
			downloadUrl: newAvatar,
			type: "png",
		})
		renderScreen(<UpdateProfileScreen />)

		const avatarInput = await screen.findByTestId("avatar-image")
		await act(async () => {
			await fireEvent.press(avatarInput)
		})

		const submitButton = await screen.findByText("Salvar")
		await act(async () => {
			await fireEvent.press(submitButton)
		})

		expect(await screen.findByText("Perfil atualizado com sucesso!")).toBeTruthy()
		expect(mockNavigate).toHaveBeenCalledWith("ProfileRoutes", { screen: "Profile" })
	})
})
