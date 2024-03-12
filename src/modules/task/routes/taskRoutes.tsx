import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TaskListScreen } from "@/modules/task/screens"
import { TaskRoutesTypes } from "./taskRoutesTypes"

const Stack = createNativeStackNavigator<TaskRoutesTypes>()

export const TaskRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="TaskList" component={TaskListScreen} />
		</Stack.Navigator>
	)
}
