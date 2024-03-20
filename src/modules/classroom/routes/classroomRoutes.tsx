import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import {
	ClassroomsScreen,
	CreateClassroomScreen,
	EnterClassroomScreen,
} from "@/modules/classroom/screen"
import { ClassroomRouteType } from "./classroomRoutesTypes"
import { TaskRoutes } from "@/modules/task/routes"

const Stack = createNativeStackNavigator<ClassroomRouteType>()

type ClassRoomRoutesProps = {
	initialRouteName?: keyof ClassroomRouteType | undefined
}
export const ClassRoomRoutes: React.FC<ClassRoomRoutesProps> = ({ initialRouteName }) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={initialRouteName}>
			<Stack.Screen name="ClassroomsScreen" component={ClassroomsScreen} />
			<Stack.Screen
				name="CreateClassroomScreen"
				component={CreateClassroomScreen}
			/>
			<Stack.Screen name="EnterClassroomScreen" component={EnterClassroomScreen} />
			<Stack.Screen name="TaskRoutes">
				{(props) => <TaskRoutes {...props} initialRouteName={undefined} />}
			</Stack.Screen>
		</Stack.Navigator>
	)
}
