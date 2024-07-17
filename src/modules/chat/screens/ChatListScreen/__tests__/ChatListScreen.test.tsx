import { fireEvent, renderScreen, screen } from "@/testUtils"
import { ChatListScreen } from "../ChatListScreen"
import { chatApi } from "@/modules/chat/api"
import { chatListMock } from "./__mocks__/chatListScreenMocks"
import { storage } from "@/storage"
import { authStorage } from "@/modules/auth/storage"
import { authApi } from "@/modules/auth/api"
import { chatAdapter } from "@/modules/chat/models/chatAdapter"

const mockedUser = chatListMock.user
jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: mockedUser,
	}),
}))

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}))

describe("integration: ChatListScreen", () => {
	it("should show error toast when getChats fails", async () => {
		jest.spyOn(chatApi, "getChats").mockRejectedValue({ message: "error" })
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(
			chatListMock.serverChatMessages
		)

		jest.spyOn(authApi, "getUserData").mockResolvedValue(chatListMock.userApi)
		jest.spyOn(authStorage, "getUser").mockResolvedValue(chatListMock.user)
		jest.spyOn(storage, "getItem").mockResolvedValue(chatListMock.storageMessage)

		renderScreen(<ChatListScreen />)

		expect(screen.getByText("Conversas")).toBeTruthy()
		expect(await screen.findByText("Erro ao buscar as conversas!")).toBeTruthy()
	})

	it("should be able to render ChatListScreen", async () => {
		jest.spyOn(chatApi, "getChats").mockResolvedValue(chatListMock.chatList)
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(
			chatListMock.serverChatMessages
		)

		jest.spyOn(authApi, "getUserData").mockResolvedValue(chatListMock.userApi)
		jest.spyOn(authStorage, "getUser").mockResolvedValue(chatListMock.user)
		jest.spyOn(storage, "getItem").mockResolvedValue(chatListMock.storageMessage)

		renderScreen(<ChatListScreen />)

		expect(screen.getByText("Conversas")).toBeTruthy()
		expect(
			await screen.findByText(chatListMock.chatList[0].classroom.name)
		).toBeTruthy()
	})

	it("should be able to search for a chat", async () => {
		jest.spyOn(chatApi, "getChats").mockResolvedValue(chatListMock.chatList)
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue([])

		jest.spyOn(authApi, "getUserData").mockResolvedValue(chatListMock.userApi)
		jest.spyOn(authStorage, "getUser").mockResolvedValue(chatListMock.user)
		jest.spyOn(storage, "getItem").mockResolvedValue(chatListMock.storageMessage)

		renderScreen(<ChatListScreen />)

		expect(
			await screen.findByText(chatListMock.chatList[0].classroom.name)
		).toBeTruthy()

		const searchInput = screen.getByPlaceholderText("Pesquisar conversa")
		fireEvent.changeText(searchInput, "1")

		expect(
			await screen.findByText(chatListMock.chatList[0].classroom.name)
		).toBeTruthy()
		expect(
			await screen.queryByText(chatListMock.chatList[1].classroom.name)
		).not.toBeTruthy()
	})

	it("should show new message number", async () => {
		jest.spyOn(chatApi, "getChats").mockResolvedValue(chatListMock.chatList)
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(
			chatListMock.serverChatMessages
		)

		jest.spyOn(authApi, "getUserData").mockResolvedValue(chatListMock.userApi)
		jest.spyOn(authStorage, "getUser").mockResolvedValue(chatListMock.user)
		jest.spyOn(storage, "getItem").mockResolvedValue(chatListMock.storageMessage)

		renderScreen(<ChatListScreen />)

		console.log(`${chatListMock.chatList[1].id}-1`)

		expect(await screen.findByTestId(`${chatListMock.chatList[1].id}-1`)).toBeTruthy()
	})

	it("should navigate to chat messages when click on chat", async () => {
		jest.spyOn(chatApi, "getChats").mockResolvedValue(chatListMock.chatList)
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(
			chatListMock.serverChatMessages
		)

		jest.spyOn(authApi, "getUserData").mockResolvedValue(chatListMock.userApi)
		jest.spyOn(authStorage, "getUser").mockResolvedValue(chatListMock.user)
		jest.spyOn(storage, "getItem").mockResolvedValue(chatListMock.storageMessage)

		renderScreen(<ChatListScreen />)

		expect(screen.getByText("Conversas")).toBeTruthy()
		const firstChat = await screen.findByText(chatListMock.chatList[0].classroom.name)

		fireEvent.press(firstChat)

		expect(mockNavigate).toHaveBeenCalledWith("ChatRoutes", {
			screen: "Messages",
			params: {
				chat: chatAdapter.toChat(chatListMock.chatList[0]),
			},
		})
	})
})
