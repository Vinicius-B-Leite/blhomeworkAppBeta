import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import { ProfileRoutesType } from "./profileRoutesType"

import { UpdateProfileScreen, ProfileScreen } from "../screens"

const Stack = createNativeStackNavigator<ProfileRoutesType>()
const ProfileRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
		</Stack.Navigator>
	)
}

export default ProfileRoutes
