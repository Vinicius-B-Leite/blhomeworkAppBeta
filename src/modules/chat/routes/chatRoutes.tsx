import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { View } from "react-native"
import { ChatListScreen } from "../screens"
import { ChatRoutesType } from "./chatRoutesTypes"
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen"

const Stack = createNativeStackNavigator<ChatRoutesType>()

const ChatRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ChatList" component={ChatListScreen} />
			<Stack.Screen name="Messages" component={MessagesScreen} />
		</Stack.Navigator>
	)
}

export default ChatRoutes
