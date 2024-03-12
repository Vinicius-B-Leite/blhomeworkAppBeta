import React from "react"
import { Button, Container, FloatButton, Header } from "@/components"
import ClassroomList from "./components/ClassroomList/ClassroomList"

import { useClassroomScreenViewController } from "./classroomScreen.viewController"

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
				onSelectClassroom={({ classroomAdmin, classroomId }) => {
					handleNavigateToTasks({ classroomAdmin, classroomId })
				}}
				isRefetching={isLoading}
				refresh={async () => {
					await refresh()
				}}
			/>

			<FloatButton onPress={handleNavigateToCreateClassroom} />
		</Container>
	)
}
