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
describe("components: Header", () => {
	it("should call show Alert to logout when it was clicked", async () => {
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

		const username = await screen.findByText("username")
		await act(async () => {
			fireEvent.press(username)
		})

		const yesAlertOption = await screen.findByText("Sim")
		await act(async () => {
			fireEvent.press(yesAlertOption)
		})

		expect(logoutApi).toHaveBeenCalledTimes(1)
		expect(logoutStorage).toHaveBeenCalledTimes(1)
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
