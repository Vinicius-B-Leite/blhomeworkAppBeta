import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import { ProfileRoutesType } from "./profileRoutesType"
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen"

const Stack = createNativeStackNavigator<ProfileRoutesType>()
const ProfileRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="UpdateProfile" component={View} />
		</Stack.Navigator>
	)
}

export default ProfileRoutes
