import { AuthRoutesType } from "@/modules/auth/routes"
import { ClassroomRouteType } from "@/modules/classroom/routes/classroomRoutesTypes"
import { ProfileRoutesType } from "@/modules/profile/routes/profileRoutesType"
import { TaskRoutesTypes } from "@/modules/task/routes"
import { NavigatorScreenParams } from "@react-navigation/native"

type AppRoutes = {
	ClassroomRoutes: NavigatorScreenParams<ClassroomRouteType>
	TaskRoutes: NavigatorScreenParams<TaskRoutesTypes>
	ProfileRoutes: NavigatorScreenParams<ProfileRoutesType>
}

export type Stacks = AuthRoutesType & ClassroomRouteType & TaskRoutesTypes

export type StacksKeys = keyof Stacks

export type RootRoutes = AuthRoutesType & AppRoutes
