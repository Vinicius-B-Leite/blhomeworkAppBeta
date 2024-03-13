import { ClassroomType } from "@/modules/classroom/models"

export type TaskRoutesTypes = {
	TaskList: {
		classroom: ClassroomType
	}
	Some: {
		some: string
	}
}
