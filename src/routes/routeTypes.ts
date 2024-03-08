import { AuthRoutesType } from "@/modules/auth/routes"
import { ClassroomRouteType } from "@/modules/classroom/routes/classroomRoutesTypes"
import { NavigatorScreenParams } from "@react-navigation/native"

type AppRoutes = {
	ClassroomStack: NavigatorScreenParams<ClassroomRouteType>
}
export type RootRoutes = AuthRoutesType & AppRoutes
