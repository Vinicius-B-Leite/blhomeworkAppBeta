import { ClassroomType } from "@/modules/classroom/models"
import { Subject } from "../model"

export type TaskRoutesTypes = {
	TaskList: {
		classroom: ClassroomType
	}
	CreateTask: {
		classroomId: string
	}
	Subjects: {
		onSelectSubject: (subject: Subject) => void
		classroomId: string
	}
	CreateSubject: {
		classroomId: string
	}
}
