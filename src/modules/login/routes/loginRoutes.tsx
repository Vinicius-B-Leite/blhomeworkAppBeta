import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginRoutesType } from "./routesTypes"
import { LoginScreen } from "../screen"

const Stack = createNativeStackNavigator<LoginRoutesType>()
export const LoginRoutes = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
		</Stack.Navigator>
	)
}
