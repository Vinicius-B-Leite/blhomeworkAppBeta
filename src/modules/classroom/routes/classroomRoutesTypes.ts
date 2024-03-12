import { TaskRoutesTypes } from "@/modules/task/routes"
import { NavigatorScreenParams } from "@react-navigation/native"

export type ClassroomRouteType = {
	ClassroomsScreen: undefined
	CreateClassroomScreen: undefined
	EnterClassroomScreen: undefined
	TaskRoutes: NavigatorScreenParams<TaskRoutesTypes>
}
