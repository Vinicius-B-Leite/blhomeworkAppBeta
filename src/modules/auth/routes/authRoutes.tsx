import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthRoutesType } from "./routesTypes"
import { LoginScreen, SingUpScreen } from "@/modules/auth/screen"

const Stack = createNativeStackNavigator<AuthRoutesType>()
export const AuthRoutes = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="SingUpScreen" component={SingUpScreen} />
		</Stack.Navigator>
	)
}
