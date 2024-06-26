import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
	UpsertSubjectScreen,
	UpsertTaskScreen,
	SubjectsScreen,
	TaskDetailsScreen,
	TaskListScreen,
} from "@/modules/task/screens"
import { TaskRoutesTypes } from "./taskRoutesTypes"

const Stack = createNativeStackNavigator<TaskRoutesTypes>()

export const TaskRoutes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="TaskList" component={TaskListScreen} />
			<Stack.Screen name="UpsertTask" component={UpsertTaskScreen} />
			<Stack.Screen name="Subjects" component={SubjectsScreen} />
			<Stack.Screen name="UpsertSubjectScreen" component={UpsertSubjectScreen} />
			<Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
		</Stack.Navigator>
	)
}
