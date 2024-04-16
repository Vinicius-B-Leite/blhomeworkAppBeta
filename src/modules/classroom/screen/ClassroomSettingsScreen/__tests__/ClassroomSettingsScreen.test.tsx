import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classroomSettingsScreenMocks"
import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"

import { Share, ShareAction } from "react-native"
import { ClassroomSettingsScreen } from "../ClassroomSettingsScreen"

jest.mock("@/hooks", () => ({
	...jest.requireActual("@/hooks"),
	useRouteParams: () => ({ classroomId: mocks.classroom.id }),
}))

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: mocks.user,
	}),
}))

describe("integration: ClassroomSettingsScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should show classroom info", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)

		renderScreen(<ClassroomSettingsScreen />)

		const classroomName = await screen.findByText(mocks.classroom.title)
		expect(classroomName).toBeVisible()

		const classroomBanner = await screen.findByTestId("classroom-banner")
		expect(classroomBanner).toBeVisible()

		const students = await screen.findAllByTestId(/(student-|adm)/, { exact: false })
		expect(students).toHaveLength(mocks.studentsApiResponse.length)
	})
	it("should share classroom code", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		const share = jest.spyOn(Share, "share").mockResolvedValue({} as ShareAction)
		renderScreen(<ClassroomSettingsScreen />)

		const shareButton = await screen.findByTestId("shareBtn")

		await act(async () => {
			fireEvent.press(shareButton)
		})
		await waitFor(() =>
			expect(share).toHaveBeenCalledWith({
				message: `Olá, entre na minha sala de aula com o código: ${mocks.classroom.id}`,
				title: "Código da sala de aula",
			})
		)
	})
	it("should show trash icon for admin", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)

		renderScreen(<ClassroomSettingsScreen />)

		const trashIcons = await screen.findAllByTestId("trashIcon-", { exact: false })

		expect(trashIcons).toBeTruthy()
	})
	it("should show toast with error if promote student to classroom admin fail", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		jest.spyOn(classroomApi, "promoteStudentToClassroomAdmin").mockRejectedValue({
			error: "some error",
		})
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(
			mocks.studentsApiResponse[0]
		)

		renderScreen(<ClassroomSettingsScreen />)

		const user1 = await screen.findByText("user1", { exact: false })
		await act(() => {
			fireEvent.press(user1)
		})

		const yesAlertOption = await screen.findByText("Sim")
		await act(() => {
			fireEvent.press(yesAlertOption)
		})

		expect(await screen.findByText("Erro ao promover aluno!"))
	})
	it("should show 'adm' label of classroom", async () => {
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		renderScreen(<ClassroomSettingsScreen />)

		await waitFor(async () => {
			const list = screen.queryByTestId("list")
			expect(list.props.data).toHaveLength(mocks.studentsApiResponse.length)
		})

		const admLabels = await screen.findByTestId("adm")

		expect(admLabels).toBeTruthy()
	})

	it("should can promote student to classroom admin", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		jest.spyOn(classroomApi, "promoteStudentToClassroomAdmin").mockResolvedValue()
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getStudentById").mockResolvedValue(
			mocks.studentsApiResponse[0]
		)

		renderScreen(<ClassroomSettingsScreen />)

		const user1 = await screen.findByText("user1", { exact: false })
		await act(() => {
			fireEvent.press(user1)
		})

		const yesAlertOption = await screen.findByText("Sim")
		await act(() => {
			fireEvent.press(yesAlertOption)
		})

		expect(await screen.findByText("Aluno promovido a administrador"))
		expect(await screen.queryAllByTestId("trashIcon-", { exact: false }))
	})
	it("should not show trash icon for non-admin", async () => {
		jest.spyOn(require("@/modules/auth/context"), "useAuth").mockReturnValue({
			user: {
				...mocks.user,
				uid: "id2",
			},
		})
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)
		renderScreen(<ClassroomSettingsScreen />)

		await waitFor(async () => {
			const list = screen.queryByTestId("list")
			expect(list.props.data).toHaveLength(mocks.studentsApiResponse.length)
		})

		const trashIcons = screen.queryAllByTestId("trashIcon-", {
			exact: false,
		})

		expect(trashIcons).toHaveLength(0)
		screen.unmount()
	})

	it("should show toast with error if get classroom info fail", async () => {
		jest.spyOn(classroomApi, "getClassroomById").mockRejectedValueOnce({
			error: "erro",
		})
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentsApiResponse
		)

		renderScreen(<ClassroomSettingsScreen />)

		expect(await screen.findByText("Erro ao buscar detalhes da sala!")).toBeTruthy()
		screen.unmount()
	})
})
