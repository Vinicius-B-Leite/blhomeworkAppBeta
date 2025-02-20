import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthRoutesType } from "./routesTypes"
import { ForgetPasswordScreen, LoginScreen, SingUpScreen } from "@/modules/auth/screen"
import { useQuickActionCallback } from "expo-quick-actions/hooks"
import { useNavigation } from "@react-navigation/native"

const Stack = createNativeStackNavigator<AuthRoutesType>()

export const AuthRoutes = (props: { initialRoute?: keyof AuthRoutesType }) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={props.initialRoute}>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="SingUpScreen" component={SingUpScreen} />
			<Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
		</Stack.Navigator>
	)
}
