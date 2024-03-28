import { ClassroomType } from "@/modules/classroom/models"
import { Subject, Task } from "../model"

export type TaskRoutesTypes = {
	TaskList: {
		classroom: ClassroomType
	}
	UpsertTask:
		| {
				classroomId: string
				task?: Task
				isUpdate: false
		  }
		| {
				classroomId: string
				task: Task
				isUpdate: true
		  }
	Subjects: {
		onSelectSubject: (subject: Subject) => void
		classroomId: string
		selectedSubjectId?: string
	}
	UpsertSubjectScreen:
		| {
				classroomId: string
				subject?: Subject
				isUpdate: false
		  }
		| {
				classroomId: string
				subject: Subject
				isUpdate: true
		  }
	TaskDetails: {
		task: Task
	}
}
