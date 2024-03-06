import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { useAppTheme } from "@/hooks"
import { Icon } from "@/components"

const Tab = createBottomTabNavigator()

export const AppRoutes: React.FC = () => {
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
				component={View}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							name="home"
							size={27}
							color={focused ? "contrast" : "darkContrast"}
						/>
					),
				}}
			/>
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
