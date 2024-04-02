import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import {
	ClassroomSettingsScreen,
	ClassroomsScreen,
	EnterClassroomScreen,
	UpsertClassroomScreen,
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
				name="UpsertClassroomScreen"
				component={UpsertClassroomScreen}
			/>
			<Stack.Screen name="EnterClassroomScreen" component={EnterClassroomScreen} />
			<Stack.Screen name="TaskRoutes" component={TaskRoutes} />
			<Stack.Screen
				name="ClassroomSettingsScreen"
				component={ClassroomSettingsScreen}
			/>
		</Stack.Navigator>
	)
}
