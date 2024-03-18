import { Container } from "@/components"
import { useRouteParams } from "@/hooks"
import React from "react"

import Header from "./components/Header/Header"
import SubjectsList from "./components/SubjectsList/SubjectsList"
import { useSubjectsScreenViewController } from "./subjectsScreen.viewController"

export const SubjectsScreen: React.FC = () => {
	const { handleNavigateToCreateSubject } = useSubjectsScreenViewController()
	const onSelectSubject = useRouteParams("Subjects")!.onSelectSubject
	return (
		<Container>
			<Header />
			<SubjectsList
				onListHeaderPress={handleNavigateToCreateSubject}
				subjects={[]}
				onSelectSubject={onSelectSubject}
			/>
		</Container>
	)
}
