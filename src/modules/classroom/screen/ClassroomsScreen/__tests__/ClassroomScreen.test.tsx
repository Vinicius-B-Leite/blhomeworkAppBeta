import { classroomApi } from "@/modules/classroom/api"
import { mocks } from "./__mocks__/classroomsScreen"
import { act, renderScreen, screen } from "@/testUtils"
import { ClassroomsScreen } from "../ClassroomsScreen"
import { authStorage } from "@/modules/auth/storage"

describe("integration: ClassroomScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	it("should show all classrooms", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		expect(await screen.findByText("Classroom 1")).toBeVisible()
		expect(await screen.findByText("Classroom 2")).toBeVisible()
		expect(await screen.findByText("Classroom 3")).toBeVisible()
	})
	it("should refresh classroom list", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
			mocks.classroomApiResponse
		)

		renderScreen(<ClassroomsScreen />)

		const classroomList = await screen.findByTestId("classroom-list")
		const { refreshControl } = classroomList.props
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValueOnce(
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
})
