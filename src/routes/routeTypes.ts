import { AuthRoutesType } from "@/modules/auth/routes"
import { ClassroomRouteType } from "@/modules/classroom/routes/classroomRoutesTypes"
import { TaskRoutesTypes } from "@/modules/task/routes"
import { NavigatorScreenParams } from "@react-navigation/native"

type AppRoutes = {
	ClassroomRoutes: NavigatorScreenParams<ClassroomRouteType>
	TaskRoutes: NavigatorScreenParams<TaskRoutesTypes>
}

export type Screens = AuthRoutesType & ClassroomRouteType & TaskRoutesTypes

export type ScreensKeys = keyof Screens

export type RootRoutes = AuthRoutesType & AppRoutes
