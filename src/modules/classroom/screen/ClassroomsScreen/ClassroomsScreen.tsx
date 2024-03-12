import React from "react"
import { Button, Container } from "@/components"
import ClassroomList from "./components/ClassroomList/ClassroomList"
import FloatButton from "./components/FloatButton/FloatButton"
import { useClassroomScreenViewController } from "./classroomScreen.viewController"
import Header from "@/components/Header/Header"

export const ClassroomsScreen: React.FC = () => {
	const {
		handleNavigateToTasks,
		classrooms,
		isLoading,
		refresh,
		handleNavigateToCreateClassroom,
		handleNavigateToEnterClassroom,
	} = useClassroomScreenViewController()

	return (
		<Container>
			<Header />

			<Button
				onPress={handleNavigateToEnterClassroom}
				link
				mt={20}
				alignItems="flex-start">
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

			<FloatButton onPress={handleNavigateToCreateClassroom} />
		</Container>
	)
}
