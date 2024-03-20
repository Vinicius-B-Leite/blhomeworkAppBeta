import { act, fireEvent, renderScreen, screen, waitFor } from "@/testUtils"

import { taskApi } from "@/modules/task/api"
import { mocks } from "./__mocks__/createTaskScreenMock"
import { taskAdapter } from "@/modules/task/model"
import { AppRoutes } from "@/routes/appRoutes"

import { classroomApi } from "@/modules/classroom/api"
import { authStorage } from "@/modules/auth/storage"

describe("integration: CreateTaskScreen", () => {
	it("should show message error in empty inputs", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)

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
	})

	it("it should create a task with title, subject and deadline", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)

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

		const datePicker = await screen.findByTestId("dateTimePicker")
		fireEvent(datePicker, "onChange", null, new Date(mocks.tasks[2].dead_line))

		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks)

		const createButton = await screen.findByText("Criar")
		await act(() => fireEvent.press(createButton))

		expect(await screen.findByText(mocks.tasks[2].title)).toBeTruthy()
	})

	it("it should show a toast error if something wrong happend", async () => {
		jest.spyOn(authStorage, "getUser").mockResolvedValue(mocks.user)

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

		const datePicker = await screen.findByTestId("dateTimePicker")
		fireEvent(datePicker, "onChange", null, new Date(mocks.tasks[2].dead_line))

		jest.spyOn(taskApi, "getTaskList").mockResolvedValueOnce(mocks.tasks)

		const createButton = await screen.findByText("Criar")
		await act(() => fireEvent.press(createButton))

		expect(await screen.findByText("Erro ao criar tarefa!")).toBeTruthy()
	})
})
