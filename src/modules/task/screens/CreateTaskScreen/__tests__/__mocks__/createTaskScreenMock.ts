import { Subject, SubjectApiResponse, TaskApiResponse } from "@/modules/task/model"
import { ClassroomApiResponse, classroomAdapter } from "@/modules/classroom/models"
import { UserType } from "@/modules/auth/models"

const subjects: SubjectApiResponse[] = [
	{ title: "Matemática", id: "1", short_name: "Mat", color_rgb: "#FF5733" },
	{ title: "Ciências", id: "2", short_name: "Cie", color_rgb: "#33FF57" },
	{ title: "História", id: "3", short_name: "His", color_rgb: "#5733FF" },
	{ title: "Geografia", id: "4", short_name: "Geo", color_rgb: "#FF3333" },
	{ title: "Português", id: "5", short_name: "Por", color_rgb: "#33FFC1" },
	{ title: "Inglês", id: "6", short_name: "Ing", color_rgb: "#B933FF" },
	{ title: "Educação Física", id: "7", short_name: "EF", color_rgb: "#FFC933" },
	{ title: "Artes", id: "8", short_name: "Art", color_rgb: "#33B5FF" },
	{ title: "Biologia", id: "9", short_name: "Bio", color_rgb: "#FFA933" },
	{ title: "Química", id: "10", short_name: "Qui", color_rgb: "#33FF8E" },
	{ title: "Física", id: "11", short_name: "Fis", color_rgb: "#8E33FF" },
	{ title: "Filosofia", id: "12", short_name: "Fil", color_rgb: "#FF33B5" },
	{ title: "Sociologia", id: "13", short_name: "Soc", color_rgb: "#33FFF4" },
	{ title: "Espanhol", id: "14", short_name: "Esp", color_rgb: "#F433FF" },
	{ title: "Literatura", id: "15", short_name: "Lit", color_rgb: "#33FFB2" },
	{ title: "Redação", id: "16", short_name: "Red", color_rgb: "#FFC433" },
	{ title: "Tecnologia", id: "17", short_name: "Tec", color_rgb: "#336CFF" },
	{ title: "Programação", id: "18", short_name: "Prog", color_rgb: "#FF336C" },
	{ title: "Economia", id: "19", short_name: "Eco", color_rgb: "#33FF71" },
	{ title: "Política", id: "20", short_name: "Pol", color_rgb: "#D833FF" },
]

const classroomApiResponse: ClassroomApiResponse[] = [
	{
		classroom: {
			admin_id: "fake-uid",

			upload: {
				path_url: "url1",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "1",
			name: "Classroom 1",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			admin_id: "1",

			upload: {
				path_url: "url2",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "2",
			name: "Classroom 2",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			admin_id: "1",

			upload: {
				path_url: "url3",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "3",
			name: "Classroom 3",
			updated_at: "2024-03-07",
		},
	},
]

const classroomParsed = classroomApiResponse.map((classroom) =>
	classroomAdapter.classroomApiResponseToClassroom(classroom)
)
const tasks: TaskApiResponse[] = [
	{
		classroom: {
			admin_id: "admin_id_1",
			banner_id: "banner_id_1",
			created_at: "2024-03-19T12:00:00Z",
			deleted_at: null,
			id: "classroom_id_1",
			name: "Nome da sala 1",
			updated_at: null,
		},
		classroom_id: "classroom_id_1",
		dead_line: "2024-03-21T12:00:00Z",
		description: "Descrição da tarefa 1",
		id: "task_id_1",
		subject: {
			classroom_id: "classroom_id_1",
			color_rgb: "#FF0000",
			id: "subject_id_1",
			short_name: "SN1",
			title: "Título do assunto 1",
		},
		subject_id: "subject_id_1",
		title: "Título da tarefa 1",
	},
	{
		classroom: {
			admin_id: "admin_id_2",
			banner_id: "banner_id_2",
			created_at: "2024-03-20T12:00:00Z",
			deleted_at: null,
			id: "classroom_id_2",
			name: "Nome da sala 2",
			updated_at: null,
		},
		classroom_id: "classroom_id_2",
		dead_line: "2024-03-22T12:00:00Z",
		description: "Descrição da tarefa 2",
		id: "task_id_2",
		subject: {
			classroom_id: "classroom_id_2",
			color_rgb: "#00FF00",
			id: "subject_id_2",
			short_name: "SN2",
			title: "Título do assunto 2",
		},
		subject_id: "subject_id_2",
		title: "Título da tarefa 2",
	},
	{
		classroom: {
			admin_id: "admin_id_3",
			banner_id: "banner_id_3",
			created_at: "2024-03-21T12:00:00Z",
			deleted_at: null,
			id: "classroom_id_3",
			name: "Nome da sala 3",
			updated_at: null,
		},
		classroom_id: "classroom_id_3",
		dead_line: "2024-03-23T12:00:00Z",
		description: "Descrição da tarefa 3",
		id: "task_id_3",
		subject: {
			classroom_id: "classroom_id_3",
			color_rgb: "#0000FF",
			id: "subject_id_3",
			short_name: "SN3",
			title: "Título do assunto 3",
		},
		subject_id: "subject_id_3",
		title: "Título da tarefa 3",
	},
]
const user: UserType = {
	email: "fake-email",
	refreshtoken: "fake-resfresh-token",
	token: "fake-token",
	uid: "fake-uid",
	username: "fake-username",
}

export const mocks = {
	subjects,
	classroomApiResponse,
	classroomParsed,
	user,
	tasks,
}
