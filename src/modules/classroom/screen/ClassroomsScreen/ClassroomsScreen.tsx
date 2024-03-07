import React from "react"
import { Button, Container } from "@/components"
import Header from "./components/Header/Header"
import ClassroomList from "./components/ClassroomList/ClassroomList"

export const ClassroomsScreen: React.FC = () => {
	return (
		<Container>
			<Header />

			<Button link mt={20} alignItems="flex-start">
				Entre em uma sala com um código
			</Button>

			<ClassroomList />
		</Container>
	)
}
