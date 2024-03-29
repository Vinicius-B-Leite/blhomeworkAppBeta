import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { useAppTheme } from "@/hooks"
import { Icon } from "@/components"
import { ClassRoomRoutes } from "@/modules/classroom/routes/classroomRoutes"
import { ClassroomRouteType } from "@/modules/classroom/routes/classroomRoutesTypes"

const Tab = createBottomTabNavigator()

type AppRoutesProps = {
	initialClassroomRouteName?: keyof ClassroomRouteType | undefined
}
export const AppRoutes: React.FC<AppRoutesProps> = ({ initialClassroomRouteName }) => {
	const theme = useAppTheme()
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.secondsBg,
					borderTopWidth: 0,
					padding: theme.spacing[12],
				},
				tabBarShowLabel: false,
			}}>
			<Tab.Screen
				name="ClassroomRoutes"
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							name="home"
							size={27}
							color={focused ? "contrast" : "darkContrast"}
						/>
					),
				}}>
				{(props) => (
					<ClassRoomRoutes
						{...props}
						initialRouteName={initialClassroomRouteName}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="ChatroomRoutes"
				component={View}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							name="chat"
							size={27}
							color={focused ? "contrast" : "darkContrast"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="ProfileRoutes"
				component={View}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							name="user"
							size={27}
							color={focused ? "contrast" : "darkContrast"}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}
