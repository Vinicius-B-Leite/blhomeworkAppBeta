import { chatApi } from "@/modules/chat/api"
import { mocks } from "./__mocks__/messaceScreenMock"

import MessagesScreen from "../MessagesScreen"
import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { chatService } from "@/modules/chat/models/chatService"
import * as utils from "@/utils"

const mockChatParam = mocks.chatParam
jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		chat: mockChatParam,
	}),
}))

const mockedUser = mocks.user
jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: mockedUser,
	}),
}))

jest.mock("@/utils")

describe("integration: MessagesScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should show toast error if send message falid", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(mocks.getChatMessages)
		jest.spyOn(chatService, "onMessageReceived").mockImplementation(
			(callback, chatId) => {
				return () => {}
			}
		)
		jest.spyOn(chatApi, "sendMessage").mockRejectedValue({ message: "error" })
		const spyupdateLastMessage = jest
			.spyOn(chatApi, "updateLastMessage")
			.mockResolvedValue()

		renderScreen(<MessagesScreen />)

		expect(await screen.findByTestId("loading")).toBeTruthy()
		expect(await screen.findByText(mocks.chatParam.classroom.title)).toBeTruthy()

		const messageInput = await screen.findByPlaceholderText("Digite sua mensagem")
		const submitButton = await screen.findByTestId("send-message")

		fireEvent.changeText(messageInput, mocks.messages[0].message)
		await act(async () => {
			await fireEvent.press(submitButton)
		})
		expect(await screen.findByText("Erro ao enviar a mensagem!")).toBeTruthy()
		await waitFor(() => expect(spyupdateLastMessage).not.toHaveBeenCalled())
	})
	it("should show toast error if listen message falid", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockRejectedValue({ message: "Error" })
		jest.spyOn(chatService, "onMessageReceived").mockReturnValue(() => {})

		renderScreen(<MessagesScreen />)

		expect(await screen.findByText("Erro ao buscar as mensagens!")).toBeTruthy()
	})

	it("should render MessagesScreen", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(mocks.getChatMessages)
		jest.spyOn(chatService, "onMessageReceived").mockReturnValue(() => {})

		renderScreen(<MessagesScreen />)

		expect(await screen.findByTestId("loading")).toBeTruthy()
		expect(await screen.findByText(mocks.chatParam.classroom.title)).toBeTruthy()
	})

	it("should recive message real time", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(mocks.getChatMessages)
		const onMessageReceived = jest
			.spyOn(chatService, "onMessageReceived")
			.mockImplementation((callback, chatId) => {
				return () => {}
			})

		renderScreen(<MessagesScreen />)

		expect(await screen.findByTestId("loading")).toBeTruthy()
		expect(await screen.findByText(mocks.chatParam.classroom.title)).toBeTruthy()

		await act(async () => {
			const message = mocks.messages[0]
			onMessageReceived.mock.calls[0][0](message)
			expect(await screen.findByText(message.message)).toBeTruthy()
		})
	})

	it("should be able to verify if message input is NOT empty and send message", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(mocks.getChatMessages)
		const onMessageReceived = jest
			.spyOn(chatService, "onMessageReceived")
			.mockImplementation((callback, chatId) => {
				return () => {}
			})
		const mockSendMessage = jest.spyOn(chatApi, "sendMessage").mockResolvedValue()
		const spyupdateLastMessage = jest
			.spyOn(chatApi, "updateLastMessage")
			.mockResolvedValue()

		renderScreen(<MessagesScreen />)

		expect(await screen.findByTestId("loading")).toBeTruthy()
		expect(await screen.findByText(mocks.chatParam.classroom.title)).toBeTruthy()

		const messageInput = await screen.findByPlaceholderText("Digite sua mensagem")
		const submitButton = await screen.findByTestId("send-message")

		fireEvent.changeText(messageInput, "    ")
		await act(async () => {
			await fireEvent.press(submitButton)
		})
		await waitFor(() => expect(mockSendMessage).not.toHaveBeenCalled())

		fireEvent.changeText(messageInput, mocks.messages[0].message)
		await act(async () => {
			await fireEvent.press(submitButton)
		})
		await waitFor(() => expect(mockSendMessage).toHaveBeenCalled())
		await waitFor(() => expect(spyupdateLastMessage).toHaveBeenCalled())

		await act(async () => {
			const message = mocks.messages[0]
			onMessageReceived.mock.calls[0][0](message)
			expect(await screen.findByText(message.message)).toBeTruthy()
		})
	})

	it("should be able to handle input", async () => {
		jest.spyOn(chatApi, "getChatMessages").mockResolvedValue(mocks.getChatMessages)
		jest.spyOn(chatService, "onMessageReceived").mockReturnValue(() => {})
		jest.spyOn(require("@/utils"), "pickImage").mockResolvedValue({
			base64: "base64",
			uri: "uri",
		} as utils.PickImageResult)
		renderScreen(<MessagesScreen />)

		expect(await screen.findByTestId("loading")).toBeTruthy()
		expect(await screen.findByText(mocks.chatParam.classroom.title)).toBeTruthy()

		const imageSelector = await screen.findByTestId("image-selector")
		fireEvent.press(imageSelector)

		const closeImage = await screen.findByTestId("close-image")
		fireEvent.press(closeImage)

		expect(await screen.queryByTestId("close-image")).toBeFalsy()
	})
})
