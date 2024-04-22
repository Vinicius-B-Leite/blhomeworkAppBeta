import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"
import { UpsertClassroomScreen } from "../UpsertClassroomScreen"
import { classroomApi } from "@/modules/classroom/api"
import { authStorage } from "@/modules/auth/storage"
import { mocks } from "./__mocks__/upsertClassroomScreenMocks"
import { taskApi } from "@/modules/task/api"

jest.mock("@/utils", () => ({
	...jest.requireActual("@/utils"),
	pickImage: jest.fn().mockResolvedValue({
		uri: "uri.png",
		base64: "base64",
	}),
	convertUriToBase64: jest.fn().mockResolvedValue("base64"),
}))

jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({
		goBack: jest.fn(),
	}),
}))

jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({
		classroom: undefined,
	}),
}))
describe("integration: UpsertClassroomScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})

	it("should create a classroom without banner and show toast message", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)

		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "createSubject").mockResolvedValue(mocks.subjectApiResponse)

		renderScreen(<UpsertClassroomScreen />)

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
		jest.spyOn(taskApi, "createSubject").mockResolvedValue(mocks.subjectApiResponse)

		renderScreen(<UpsertClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Erro ao criar sala!")).toBeTruthy()
	})
	it("should show input message error if the name length is less than 3", async () => {
		renderScreen(<UpsertClassroomScreen />)

		const input = screen.getByPlaceholderText("Nome da sala")
		const button = screen.getByTestId("create-classroom")

		fireEvent.changeText(input, "ab")

		expect(await screen.findByText("Mínimo de 3 caracteres")).toBeTruthy()
		expect(button).toBeDisabled()
	})
	it("should create a classroom with banner and show toast message", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "createSubject").mockResolvedValue(mocks.subjectApiResponse)

		renderScreen(<UpsertClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")
		const selectBanner = await screen.findByTestId("select-banner")

		await act(async () => await fireEvent.press(selectBanner))

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Sala criada com sucesso!")).toBeTruthy()
	})
	it('should change "Criar" to "Atualizar" and inputs already fill when editing a classroom', async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "createClassroom").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "createSubject").mockResolvedValue(mocks.subjectApiResponse)

		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroom: mocks.classroom,
		})

		renderScreen(<UpsertClassroomScreen />)

		expect(await screen.findByText("Atualizar sala")).toBeTruthy()
		expect(await screen.findByText("Atualizar")).toBeTruthy()

		const classroomNameInput = await screen.findByPlaceholderText("Nome da sala", {
			exact: false,
		})
		const banner = await screen.findByTestId("select-banner")

		expect(classroomNameInput.props.value).toBe("example_classroom")
		expect(banner.props.children[0].props.source.uri).toBe("url_banner")
	})
	it("should update a classroom and show toast message", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "updateClassroom").mockResolvedValue({
			classroom: mocks.classroomApiResponse.classroom,
		})

		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroom: mocks.classroom,
		})

		renderScreen(<UpsertClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")
		const selectBanner = await screen.findByTestId("select-banner")

		await act(async () => await fireEvent.press(selectBanner))

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Sala atualizada com sucesso!")).toBeTruthy()
		screen.unmount()
	})
	it("should show error toast when update classroom fails", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "uploadClassroomBanner").mockResolvedValue({ id: "id" })
		jest.spyOn(classroomApi, "updateClassroom").mockRejectedValue({
			error: "error",
		})

		jest.spyOn(require("@/hooks"), "useRouteParams").mockReturnValue({
			classroom: mocks.classroom,
		})

		renderScreen(<UpsertClassroomScreen />)

		const input = await screen.findByPlaceholderText("Nome da sala", { exact: false })
		const button = await screen.findByTestId("create-classroom")
		const selectBanner = await screen.findByTestId("select-banner")

		await act(async () => await fireEvent.press(selectBanner))

		fireEvent.changeText(input, "Sala de teste")

		await waitFor(() => expect(button).not.toBeDisabled())

		await act(async () => await fireEvent.press(button))

		expect(await screen.findByText("Erro ao atualizar sala!")).toBeTruthy()
	})
})
