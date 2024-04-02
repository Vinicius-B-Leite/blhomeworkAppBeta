import { TaskRoutesTypes } from "@/modules/task/routes"
import { NavigatorScreenParams } from "@react-navigation/native"
import { ClassroomType } from "../models"

export type ClassroomRouteType = {
	ClassroomsScreen: undefined
	CreateClassroomScreen: undefined
	EnterClassroomScreen: undefined
	TaskRoutes: NavigatorScreenParams<TaskRoutesTypes>
	ClassroomSettingsScreen: {
		classroom: ClassroomType
	}
}
