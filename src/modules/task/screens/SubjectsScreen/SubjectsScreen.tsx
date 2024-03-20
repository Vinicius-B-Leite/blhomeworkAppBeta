import { Container } from "@/components"
import { useRouteParams } from "@/hooks"
import React from "react"

import Header from "./components/Header/Header"
import SubjectsList from "./components/SubjectsList/SubjectsList"
import { useSubjectsScreenViewController } from "./subjectsScreen.viewController"

export const SubjectsScreen: React.FC = () => {
	const { handleNavigateToCreateSubject, isLoading, subjectList, refresh, goBack } =
		useSubjectsScreenViewController()
	const onSelectSubject = useRouteParams("Subjects")!.onSelectSubject

	return (
		<Container>
			<Header onBackPress={goBack} />
			<SubjectsList
				onListHeaderPress={handleNavigateToCreateSubject}
				subjects={subjectList}
				onSelectSubject={onSelectSubject}
				isLoading={isLoading}
				refresh={refresh}
			/>
		</Container>
	)
}
