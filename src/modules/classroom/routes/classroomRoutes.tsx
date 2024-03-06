import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { ClassroomsScreen } from "@/modules/classroom/screen"

const Stack = createNativeStackNavigator()

export const ClassRoomRoutes: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="ClassroomsScreen">
			<Stack.Screen name="ClassroomsScreen" component={ClassroomsScreen} />
		</Stack.Navigator>
	)
}
