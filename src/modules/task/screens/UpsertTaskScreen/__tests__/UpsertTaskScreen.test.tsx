import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"

import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/createTaskScreenMock"
import { taskAdapter } from "@/modules/task/model"
import { AppRoutes } from "@/routes/appRoutes"

import { classroomApi } from "@/modules/classroom/api"
import { authStorage } from "@/modules/auth/storage"
import { api } from "@/api"
import { months } from "@/modules/task/constants"
import { formatDate } from "@/utils"
import { authApi } from "@/modules/auth/api"

jest.mock("@/modules/task/utils")

jest.mock("@/modules/auth/context", () => ({
	...jest.requireActual("@/modules/auth/context"),
	useAuth: jest.fn(() => ({ user: mocks.user })),
}))
describe("integration: UpsertTaskScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should show message error in empty inputs", async () => {
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks.slice(0, 2))
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "createTask").mockResolvedValue(mocks.tasks[2])

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const firstClassroom = await screen.findByText("Classroom 1")
		await act(() => {
			fireEvent.press(firstClassroom)
		})

		const floatingButton = await screen.findByTestId("float-button")
		await act(() => {
			fireEvent.press(floatingButton)
		})

		fireEvent.press(screen.getByText("Criar"))

		expect(await screen.findByText("Mínimo de 3 caracteres")).toBeTruthy()
		expect(await screen.findByText("Disciplina é obrigatória")).toBeTruthy()
		expect(await screen.findByText("Data de entrega é obrigatória")).toBeTruthy()
		screen.unmount()
	})
	it("it should create a task with title, subject and deadline", async () => {
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks.slice(0, 2))
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "createTask").mockResolvedValue(mocks.tasks[2])

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const firstClassroom = await screen.findByText("Classroom 1")
		await act(() => {
			fireEvent.press(firstClassroom)
		})

		const floatingButton = await screen.findByTestId("float-button")
		await act(() => {
			fireEvent.press(floatingButton)
		})
		const title = await screen.findByPlaceholderText("Título")
		const subject = await screen.findByPlaceholderText("Disciplina")

		fireEvent.changeText(title, mocks.tasks[2].title)

		await act(() => fireEvent.press(subject))

		const parsedSubject = taskAdapter.subjectApiResponseToSubject(mocks.subjects[0])
		await waitFor(() => expect(screen.getByText("Disciplinas da sala")).toBeTruthy())
		const firstSubject = await screen.findByText(parsedSubject.name)

		fireEvent.press(firstSubject)

		const deadLine = await screen.findByText("Entrega")
		await act(() => fireEvent.press(deadLine))

		const month = new Date(mocks.tasks[2].dead_line).getMonth()
		const day = new Date(mocks.tasks[2].dead_line).getDay().toString()

		const selectedMonth = await screen.findByTestId("selected-month")

		await act(() => fireEvent.press(selectedMonth))
		await act(() => fireEvent.press(screen.getByText(months[month + 1])))
		await act(() => fireEvent.press(screen.getByText((Number(day) + 1).toString())))
		await act(() => fireEvent.press(screen.getByText("salvar")))

		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks)

		const createButton = await screen.findByText("Criar")
		await act(() => fireEvent.press(createButton))

		expect(await screen.findByText(mocks.tasks[2].title)).toBeTruthy()
		screen.unmount()
	})
	it("it should create a task with title, description,subject, uploads and deadline", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(api, "uploadFile").mockResolvedValue({
			downloadUrl: "http://example.com",
			type: "image/png",
		})
		jest.spyOn(taskApi, "createUpload").mockImplementation()
		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks.slice(0, 2))
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "createTask").mockResolvedValue(mocks.tasks[2])
		jest.spyOn(require("@/modules/task/utils"), "getDocuments").mockResolvedValue(
			mocks.documents
		)

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const firstClassroom = await screen.findByText("Classroom 1")
		await act(() => {
			fireEvent.press(firstClassroom)
		})

		const floatingButton = await screen.findByTestId("float-button")
		await act(() => {
			fireEvent.press(floatingButton)
		})
		const title = await screen.findByPlaceholderText("Título")
		const subject = await screen.findByPlaceholderText("Disciplina")
		const description = await screen.findByPlaceholderText("Descrição")
		fireEvent.changeText(title, mocks.tasks[2].title)

		await act(() => fireEvent.press(subject))

		const parsedSubject = taskAdapter.subjectApiResponseToSubject(mocks.subjects[0])
		await waitFor(() => expect(screen.getByText("Disciplinas da sala")).toBeTruthy())
		const firstSubject = await screen.findByText(parsedSubject.name)

		fireEvent.press(firstSubject)

		fireEvent.changeText(description, mocks.tasks[2].description)

		const deadLine = await screen.findByText("Entrega")
		await act(() => fireEvent.press(deadLine))

		const month = new Date(mocks.tasks[2].dead_line).getMonth()
		const day = new Date(mocks.tasks[2].dead_line).getDay().toString()

		const selectedMonth = await screen.findByTestId("selected-month")

		await act(() => fireEvent.press(selectedMonth))
		await act(() => fireEvent.press(screen.getByText(months[month + 1])))
		await act(() => fireEvent.press(screen.getByText((Number(day) + 1).toString())))
		await act(() => fireEvent.press(screen.getByText("salvar")))

		const uploadButton = await screen.findByText("Material de apoio")
		fireEvent.press(uploadButton)

		await act(async () =>
			fireEvent.press(await screen.findByText("Selecione um arquivo"))
		)

		const file = await screen.findByTestId("delete-1")
		await act(() => fireEvent.press(file))

		await waitFor(() =>
			expect(screen.queryByText(mocks.classroomParsed[1].title)).toBeNull()
		)

		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)

		const createButton = await screen.findByText("Criar")
		await act(() => fireEvent.press(createButton))

		expect(await screen.findByText(mocks.tasks[2].title)).toBeTruthy()
		screen.unmount()
	})
	it("it should show a toast error if something wrong happend", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks.slice(0, 2))
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "createTask").mockRejectedValue({ error: "Some error" })

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const firstClassroom = await screen.findByText("Classroom 1")
		await act(() => {
			fireEvent.press(firstClassroom)
		})

		const floatingButton = await screen.findByTestId("float-button")
		await act(() => {
			fireEvent.press(floatingButton)
		})
		const title = await screen.findByPlaceholderText("Título")
		const subject = await screen.findByPlaceholderText("Disciplina")

		fireEvent.changeText(title, mocks.tasks[2].title)

		await act(() => fireEvent.press(subject))

		const parsedSubject = taskAdapter.subjectApiResponseToSubject(mocks.subjects[0])
		await waitFor(() => expect(screen.getByText("Disciplinas da sala")).toBeTruthy())
		const firstSubject = await screen.findByText(parsedSubject.name)

		fireEvent.press(firstSubject)

		const deadLine = await screen.findByText("Entrega")
		await act(() => fireEvent.press(deadLine))

		const month = new Date(mocks.tasks[2].dead_line).getMonth()
		const day = new Date(mocks.tasks[2].dead_line).getDay().toString()

		const selectedMonth = await screen.findByTestId("selected-month")

		await act(() => fireEvent.press(selectedMonth))
		await act(() => fireEvent.press(screen.getByText(months[month + 1])))
		await act(() => fireEvent.press(screen.getByText((Number(day) + 1).toString())))
		await act(() => fireEvent.press(screen.getByText("salvar")))

		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks)

		const createButton = await screen.findByText("Criar")
		await act(() => fireEvent.press(createButton))

		expect(await screen.findByText("Erro ao criar tarefa!")).toBeTruthy()
		screen.unmount()
	})
	it("should update a task", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])

		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "updateTask").mockResolvedValue(mocks.tasks[2])

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const thirdClassroom = await screen.findByText("Classroom 3")
		await act(async () => {
			fireEvent(thirdClassroom, "press")
		})

		await waitFor(() => expect(screen.getByText("Tarefas")).toBeTruthy())
		const firstTask = await screen.findByText(mocks.tasks[2].title)

		await act(async () => {
			fireEvent(firstTask, "longPress")
		})

		await act(async () => {
			fireEvent.press(screen.getByTestId("pen"))
		})

		expect(await screen.findByText("Atualizar Tarefa")).toBeTruthy()
		expect(await screen.findByText("Salvar")).toBeTruthy()

		const titleInput = await screen.findByPlaceholderText("Título")
		fireEvent.changeText(titleInput, "Another new title")

		const month = new Date(mocks.tasks[2].dead_line).getMonth()
		const day = new Date(mocks.tasks[2].dead_line).getDay().toString()

		await act(() =>
			fireEvent.press(
				screen.getByText(formatDate(new Date(mocks.tasks[2].dead_line)))
			)
		)

		const selectedMonth = await screen.findByTestId("selected-month")

		await act(() => fireEvent.press(selectedMonth))
		await act(() => fireEvent.press(screen.getByText(months[month + 1])))
		await act(() => fireEvent.press(screen.getByText((Number(day) + 1).toString())))
		await act(() => fireEvent.press(screen.getByText("salvar")))

		const updateButton = await screen.findByText("Salvar")
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(
			mocks.tasks.map((t) =>
				t.title == mocks.tasks[0].title ? { ...t, title: "Another new title" } : t
			)
		)
		await act(async () => {
			fireEvent.press(updateButton)
		})

		expect(await screen.findByText("Tarefa atualizada com sucesso!")).toBeTruthy()
		expect(await screen.findByText("Another new title")).toBeTruthy()
		screen.unmount()
	})
	it("should show error toast when update a task fails", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)
		jest.spyOn(authApi, "getUserData").mockResolvedValue({
			email: mocks.user.email,
			user_name: mocks.user.username,
			avatar_url: mocks.user.avatarUrl,
			id: mocks.user.uid,
		})
		jest.spyOn(taskApi, "getUploads").mockResolvedValue([])

		jest.spyOn(classroomApi, "getClassrooms").mockResolvedValue(
			mocks.classroomApiResponse
		)
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(mocks.tasks)
		jest.spyOn(taskApi, "getDoneTaskList").mockResolvedValue([])
		jest.spyOn(taskApi, "getSubjectList").mockResolvedValue(mocks.subjects)
		jest.spyOn(taskApi, "updateTask").mockRejectedValue({ message: "Some error" })

		renderScreen(<AppRoutes initialClassroomRouteName="ClassroomsScreen" />)

		const thirdClassroom = await screen.findByText("Classroom 3")
		await act(async () => {
			fireEvent(thirdClassroom, "press")
		})

		await waitFor(() => expect(screen.getByText("Tarefas")).toBeTruthy())
		const firstTask = await screen.findByText(mocks.tasks[2].title)

		await act(async () => {
			fireEvent(firstTask, "longPress")
		})

		await act(async () => {
			fireEvent.press(screen.getByTestId("pen"))
		})

		expect(await screen.findByText("Atualizar Tarefa")).toBeTruthy()
		expect(await screen.findByText("Salvar")).toBeTruthy()

		const titleInput = await screen.findByPlaceholderText("Título")
		fireEvent.changeText(titleInput, "Another new title")

		const month = new Date(mocks.tasks[2].dead_line).getMonth()
		const day = new Date(mocks.tasks[2].dead_line).getDay().toString()

		await act(() =>
			fireEvent.press(
				screen.getByText(formatDate(new Date(mocks.tasks[2].dead_line)))
			)
		)

		const selectedMonth = await screen.findByTestId("selected-month")

		await act(() => fireEvent.press(selectedMonth))
		await act(() => fireEvent.press(screen.getByText(months[month + 1])))
		await act(() => fireEvent.press(screen.getByText((Number(day) + 1).toString())))
		await act(() => fireEvent.press(screen.getByText("salvar")))

		const updateButton = await screen.findByText("Salvar")
		jest.spyOn(taskApi, "getTaskList").mockResolvedValue(
			mocks.tasks.map((t) =>
				t.title == mocks.tasks[2].title ? { ...t, title: "Another new title" } : t
			)
		)
		await act(async () => {
			fireEvent.press(updateButton)
		})

		expect(
			await screen.findByText("Ocorreu um erro ao atualizar a tarefa!")
		).toBeTruthy()
	})
})
