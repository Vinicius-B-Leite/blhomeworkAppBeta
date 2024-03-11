import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { CreateClassroomScreen } from "../CreateClassroomScreen"
import { classroomApi } from "@/modules/classroom/api"
import { authStorage } from "@/modules/auth/storage"
import { mocks } from "./__mocks__/createClassroomScreenMocks"

jest.mock("@/utils", () => ({
	...jest.requireActual("@/utils"),
	pickImage: jest.fn().mockResolvedValue({
		uri: "uri.png",
		base64: "base64",
	}),
}))

jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		goBack: jest.fn(),
	}),
}))
describe("integration: CreateClassroomScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})

	it("should create a classroom without banner and show toast message", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)

		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue()

		renderScreen(<CreateClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Sala criada com sucesso!")).toBeTruthy()

		screen.unmount()
	})
	it("should show toast error message if error", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockRejectedValue({
			message: "some error",
		})
		jest.spyOn(classroomApi, "createClassroom").mockRejectedValue({
			message: "error",
		})

		renderScreen(<CreateClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Erro ao criar sala!")).toBeTruthy()
	})
	it("should show input message error if the name length is less than 3", async () => {
		renderScreen(<CreateClassroomScreen />)

		const input = screen.getByPlaceholderText("Nome da sala")
		const button = screen.getByTestId("create-classroom")

		fireEvent.changeText(input, "ab")

		expect(await screen.findByText("Mínimo de 3 caracteres")).toBeTruthy()
		expect(button).toBeDisabled()
	})
	it("should create a classroom with banner and show toast message", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue()

		renderScreen(<CreateClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")
		const selectBanner = await screen.findByTestId("select-banner")

		await act(async () => await fireEvent.press(selectBanner))

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Sala criada com sucesso!")).toBeTruthy()
	})
})
