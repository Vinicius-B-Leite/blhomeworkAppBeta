import React from "react"

import {
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { useAppSafeArea, useAppTheme } from "@/hooks"
import { Icon } from "@/components"
import { ClassRoomRoutes } from "@/modules/classroom/routes/classroomRoutes"
import { ClassroomRouteType } from "@/modules/classroom/routes/classroomRoutesTypes"
import ProfileRoutes from "@/modules/profile/routes/profileRoutes"
import Developing from "@/modules/chat/screens/Developing"
import ChatRoutes from "@/modules/chat/routes/chatRoutes"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

const Tab = createBottomTabNavigator()

type AppRoutesProps = {
	initialClassroomRouteName?: keyof ClassroomRouteType | undefined
}
export const AppRoutes: React.FC<AppRoutesProps> = ({ initialClassroomRouteName }) => {
	const theme = useAppTheme()
	const { bottom } = useAppSafeArea()

	const tabBarScreenOptions: BottomTabNavigationOptions = {
		tabBarStyle: {
			backgroundColor: theme.colors.secondsBg,
			borderTopWidth: 0,
			padding: theme.spacing[12],
			paddingBottom: bottom,
		},
		tabBarShowLabel: false,
		headerShown: false,
	}

	return (
		<Tab.Navigator id="AppRoutes" screenOptions={tabBarScreenOptions}>
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
				name="ChatRoutes"
				component={ChatRoutes}
				options={({ route }) => {
					let tabBarStyle = tabBarScreenOptions.tabBarStyle
					const focusedRouteName = getFocusedRouteNameFromRoute(route)

					if (focusedRouteName === "Messages") {
						tabBarStyle = {
							display: "none",
						}
					}
					return {
						tabBarIcon: ({ focused }) => (
							<Icon
								name="chat"
								size={27}
								color={focused ? "contrast" : "darkContrast"}
							/>
						),
						tabBarStyle: tabBarStyle,
					}
				}}
			/>
			<Tab.Screen
				name="ProfileRoutes"
				component={ProfileRoutes}
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
