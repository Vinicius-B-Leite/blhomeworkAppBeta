import { act, fireEvent, renderScreen, screen } from "@/testUtils"
import { Header } from "../Header"
import { authApi } from "@/modules/auth/api"
import { authStorage } from "@/modules/auth/storage"
import { storage } from "@/storage"

const mockToogleTheme = jest.fn()

jest.mock("@/contextsProviders", () => ({
	...jest.requireActual("@/contextsProviders"),
	useThemeContext: () => ({
		theme: "light",
		toogleTheme: mockToogleTheme,
	}),
}))

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}))

describe("components: Header", () => {
	it("should navigate to profile screen", async () => {
		const logoutApi = jest.fn()
		const logoutStorage = jest.fn()

		jest.spyOn(authApi, "singOut").mockImplementation(logoutApi)
		jest.spyOn(storage, "removeItem").mockImplementation(logoutStorage)
		jest.spyOn(authStorage, "getUser").mockResolvedValue({
			email: "email",
			username: "username",
			refreshtoken: "refreshtoken",
			token: "token",
			uid: "uid",
		})
		renderScreen(<Header />)

		await act(async () => {
			fireEvent.press(await screen.findByText("username"))
		})

		expect(mockNavigate).toHaveBeenCalledWith("ProfileRoutes", { screen: "Profile" })
	})
	it("should call toggleTheme when click on the icon", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue({
			email: "email",
			username: "username",
			refreshtoken: "refreshtoken",
			token: "token",
			uid: "uid",
		})

		renderScreen(<Header />)

		const sunIcon = await screen.findByTestId("sun")
		await act(async () => {
			fireEvent.press(sunIcon)
		})

		expect(mockToogleTheme).toHaveBeenCalledTimes(1)
	})
})
