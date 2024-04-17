import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classroomsScreen"
import {
	act,
	fireEvent,
	renderScreen,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@/testUtils"
import { ClassroomsScreen } from "../ClassroomsScreen"
import { authStorage } from "@/modules/auth/storage"
import { taskApi } from "@/modules/task/api"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => {
	return {
		...jest.requireActual("@react-navigation/native"),
		useNavigation: () => ({
			navigate: mockNavigate,
		}),
	}
})

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: () => ({
		user: mocks.user,
	}),
}))

describe("integration: ClassroomScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	beforeAll(() => {
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
	})
	it("should navigate to ClassroomSettingsScreen when animated header settings icon is pressed", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		expect(await screen.findByText(mocks.user.username)).toBeVisible()
		expect(await screen.findByText("Classroom 1")).toBeVisible()
		expect(await screen.findByText("Classroom 2")).toBeVisible()
		expect(await screen.findByText("Classroom 3")).toBeVisible()

		const classroom = await screen.findByText("Classroom 1")

		await act(async () => {
			await fireEvent(classroom, "longPress")
		})

		const settings = await screen.findByTestId("settings")

		fireEvent.press(settings)

		expect(mockNavigate).toHaveBeenCalledWith("ClassroomRoutes", {
			screen: "ClassroomSettingsScreen",
			params: { classroomId: mocks.classroomParsed[0].id },
		})
		screen.unmount()
	})
	it("should navigate to UpsertClassroomScreen when animated header pen icon is pressed", async () => {
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		expect(await screen.findByText(mocks.user.username)).toBeVisible()
		expect(await screen.findByText("Classroom 1")).toBeVisible()
		expect(await screen.findByText("Classroom 2")).toBeVisible()
		expect(await screen.findByText("Classroom 3")).toBeVisible()

		const classroom = await screen.findByText("Classroom 1")

		await act(async () => {
			await fireEvent(classroom, "longPress")
		})

		const penIcon = await screen.findByTestId("pen")

		fireEvent.press(penIcon)

		expect(mockNavigate).toHaveBeenCalledWith("ClassroomRoutes", {
			screen: "UpsertClassroomScreen",
			params: { classroom: mocks.classroomParsed[0] },
		})
	})
	it("should show all classrooms", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		expect(
			await screen.findAllByTestId("classroom - ", { exact: false })
		).toHaveLength(3)
		screen.unmount()
	})
	it("should refresh classroom list", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		expect(await screen.findByText("Classroom 1")).toBeVisible()
		expect(await screen.findByText("Classroom 2")).toBeVisible()
		expect(await screen.findByText("Classroom 3")).toBeVisible()

		const classroomList = await screen.findByTestId("classroom-list")
		const { refreshControl } = classroomList.props
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse.splice(0, 1)
		)
		await act(async () => {
			await refreshControl.props.onRefresh()
		})

		await waitFor(async () => {
			expect(await screen.queryByText("Classroom 1")).toBeVisible()
			expect(await screen.queryByText("Classroom 2")).not.toBeVisible()
			expect(await screen.queryByText("Classroom 3")).not.toBeVisible()
		})
	})
	it("should show toast if error", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockRejectedValue({ message: "error" })

		renderScreen(<ClassroomsScreen />)

		expect(await screen.findByText("Erro ao buscar as salas!")).toBeVisible()
	})
	it("should navigate to Create Classroom Screen when float button is pressed", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		const floatButton = await screen.findByTestId("float-button")
		await act(async () => {
			await fireEvent.press(floatButton)
		})
		expect(mockNavigate).toHaveBeenCalledWith("ClassroomRoutes", {
			screen: "UpsertClassroomScreen",
		})
	})
	it("should navigate to ENTER Classroom Screen when underline button is pressed", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		const underlineBtn = await screen.findByText(/Entre em uma sala com um código/i)
		await act(async () => {
			await fireEvent.press(underlineBtn)
		})
		expect(mockNavigate).toHaveBeenCalledWith("ClassroomRoutes", {
			screen: "EnterClassroomScreen",
		})
		screen.unmount()
	})
	it("should can leave classroom", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(classroomApi, "getClassroomById").mockResolvedValue(
			mocks.classroomApiResponse[1]
		)
		jest.spyOn(classroomApi, "getStudents").mockResolvedValue(
			mocks.studentApiResponse
		)
		jest.spyOn(classroomApi, "leaveClassroom").mockResolvedValue()
		jest.spyOn(classroomApi, "deleteClassroom").mockResolvedValue()

		renderScreen(<ClassroomsScreen />)

		const classroom = await screen.findByText("Classroom 2")

		await act(() => {
			fireEvent(classroom, "longPress")
		})

		const leaveIcon = await screen.findByTestId("leave")
		await act(async () => {
			fireEvent.press(leaveIcon)
		})

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse.filter(
				(classroom) => classroom.classroom.name !== "Classroom 2"
			)
		)
		expect(await screen.findByText("Deseja realmente sair da sala?")).toBeVisible()

		const yesAlertOption = await screen.findByText("Sim")

		await act(async () => {
			await fireEvent.press(yesAlertOption)
		})

		expect(await screen.findByText("Saiu da sala com sucesso!")).toBeVisible()

		await waitFor(() => expect(screen.queryByText("Classroom 2")).toBeNull())
	}, 20000)
})
