import React from "react"
import { Button, Container } from "@/components"
import Header from "./components/Header/Header"
import ClassroomList from "./components/ClassroomList/ClassroomList"
import { useClassroomScreenModelView } from "./classroomScreen.modelView"

export const ClassroomsScreen: React.FC = () => {
	const {
		handleNavigateToProfile,
		handleNavigateToTasks,
		classrooms,
		isLoading,
		refresh,
	} = useClassroomScreenModelView()

	return (
		<Container>
			<Header onPress={handleNavigateToProfile} />

			<Button link mt={20} alignItems="flex-start">
				Entre em uma sala com um código
			</Button>

			<ClassroomList
				classroomList={classrooms}
				onSelectClassroom={handleNavigateToTasks}
				isRefetching={isLoading}
				refresh={async () => {
					await refresh()
				}}
			/>
		</Container>
	)
}
