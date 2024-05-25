import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { ProfileScreen } from "../ProfileScreen"
import { authStorage } from "@/modules/auth/storage"
import { profileMock } from "./__mocks__/profileMock"
import { storage } from "@/storage"
import { dark } from "@/theme"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}))

describe("integration: ProfileScreen", () => {
	it("should render ProfileScreen", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(profileMock.user)
		renderScreen(<ProfileScreen />)

		const avatar = await screen.findByTestId("avatar")
		const username = await screen.findByText(profileMock.user.username)
		const email = await screen.findByText(profileMock.user.email)
		expect(username).toBeTruthy()
		expect(email).toBeTruthy()
		expect(avatar.props.source[0].uri).toEqual(profileMock.user.avatarUrl)
	})
	it("should navigate to UpdateProfile", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(profileMock.user)
		renderScreen(<ProfileScreen />)

		const updateProfileButton = await screen.findByText("Dados de usuário")
		await act(async () => {
			fireEvent.press(updateProfileButton)
		})

		expect(mockNavigate).toHaveBeenCalledWith("ProfileRoutes", {
			screen: "UpdateProfile",
		})
	})
	it("should logout", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(profileMock.user)
		const mockRemoveUser = jest.spyOn(authStorage, "removeUser").mockResolvedValue()
		const mockRemoveAll = jest.spyOn(storage, "removeAll").mockResolvedValue()
		renderScreen(<ProfileScreen />)

		const logoutButton = await screen.findByText("Sair da conta")
		await act(async () => {
			fireEvent.press(logoutButton)
		})

		const confirmButton = await screen.findByText("Sim")
		await act(async () => {
			fireEvent.press(confirmButton)
		})

		expect(mockRemoveUser).toHaveBeenCalled()
		expect(mockRemoveAll).toHaveBeenCalled()
	})
	it("should toggle theme", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(profileMock.user)
		renderScreen(<ProfileScreen />)

		const themeButton = await screen.findByText("Tema")
		await act(async () => {
			fireEvent.press(themeButton)
		})

		console.log(themeButton.props)

		await waitFor(() =>
			expect(themeButton.props.style[0].color).toBe(dark.colors.text)
		)
	})
})
