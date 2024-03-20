import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
	CreateSubjectScreen,
	CreateTaskScreen,
	SubjectsScreen,
	TaskListScreen,
} from "@/modules/task/screens"
import { TaskRoutesTypes } from "./taskRoutesTypes"

const Stack = createNativeStackNavigator<TaskRoutesTypes>()

type TaskRoutesProps = {
	initialRouteName?: keyof TaskRoutesTypes | undefined
}
export const TaskRoutes: React.FC<TaskRoutesProps> = ({ initialRouteName }) => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={initialRouteName}>
			<Stack.Screen name="TaskList" component={TaskListScreen} />
			<Stack.Screen name="CreateTask" component={CreateTaskScreen} />
			<Stack.Screen name="Subjects" component={SubjectsScreen} />
			<Stack.Screen name="CreateSubject" component={CreateSubjectScreen} />
		</Stack.Navigator>
	)
}
