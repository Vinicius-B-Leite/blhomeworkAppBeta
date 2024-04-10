import { act, fireEvent, renderScreen, screen } from "@/testUtils"
import { Header } from "../Header"
import { authApi } from "@/modules/auth/api"
import { authStorage } from "@/modules/auth/storage"
import { storage } from "@/storage"

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
})
