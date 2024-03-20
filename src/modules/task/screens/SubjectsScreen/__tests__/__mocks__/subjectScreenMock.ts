import { Subject, SubjectApiResponse } from "@/modules/task/model"

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
export const mocks = {
	subjects,
}
