import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthRoutesType } from "./routesTypes"
import { ForgetPasswordScreen, LoginScreen, SingUpScreen } from "@/modules/auth/screen"
import { View } from "react-native"

const Stack = createNativeStackNavigator<AuthRoutesType>()
export const AuthRoutes = (props: { initialRoute?: keyof AuthRoutesType }) => {
	return (
		<View style={{ flex: 1 }} testID="auth-routes">
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName={props.initialRoute}>
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="SingUpScreen" component={SingUpScreen} />
				<Stack.Screen
					name="ForgetPasswordScreen"
					component={ForgetPasswordScreen}
				/>
			</Stack.Navigator>
		</View>
	)
}
