import { AnimatedBox, Box, Container, Icon, PressableBox, Text } from "@/components"
import { useAppSafeArea, useAppTheme, useRouteParams } from "@/hooks"
import React, { useEffect } from "react"

import Header from "./components/Header/Header"
import SubjectsList from "./components/SubjectsList/SubjectsList"
import { useSubjectsScreenViewController } from "./subjectsScreen.viewController"

export const SubjectsScreen: React.FC = () => {
	const {
		handleNavigateToCreateSubject,
		isLoading,
		subjectList,
		refresh,
		goBack,
		handleSelectSubject,
		onLongPressSubject,
		handleSetSearchSubject,
		searchSubject,
		isSearchingSubject,
	} = useSubjectsScreenViewController()

	return (
		<>
			<Container>
				<Header
					onBackPress={goBack}
					onChangeSearchText={handleSetSearchSubject}
					searchText={searchSubject}
					isSearchingSubject={isSearchingSubject}
				/>
				<SubjectsList
					onListHeaderPress={handleNavigateToCreateSubject}
					onLongPressSubject={(subject) => onLongPressSubject(subject)}
					subjects={subjectList}
					onSelectSubject={handleSelectSubject}
					isLoading={isLoading}
					refresh={refresh}
				/>
			</Container>
		</>
	)
}
