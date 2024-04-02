import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classroomsScreen"
import { act, fireEvent, renderScreen, screen } from "@/testUtils"
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

describe("integration: ClassroomScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	beforeAll(() => {
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
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
			refreshControl.props.onRefresh()
		})
		expect(await screen.queryByText("Classroom 1")).toBeVisible()
		expect(await screen.queryByText("Classroom 2")).not.toBeVisible()
		expect(await screen.queryByText("Classroom 3")).not.toBeVisible()
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
	})
})
