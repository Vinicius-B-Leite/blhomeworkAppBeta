import { Box, Icon, Input, PressableBox } from "@/components"
import { Spinner } from "@/components/Spinner/Spinner"
import React from "react"

type HeaderProps = {
	onBackPress: () => void
	onChangeSearchText: (text: string) => void
	searchText: string
	isSearchingSubject?: boolean
}
const Header: React.FC<HeaderProps> = ({
	onBackPress,
	onChangeSearchText,
	searchText,
	isSearchingSubject,
}) => {
	return (
		<Box flexDirection="row" alignItems="center" gap={14}>
			<PressableBox p={8} onPress={onBackPress} testID="backIcon">
				<Icon name="left" />
			</PressableBox>

			<Box flex={1}>
				<Input
					placeholder="Pesquisar disciplina"
					RightIcon={<Icon name="search" />}
					LeftIcon={isSearchingSubject ? <Spinner size={12} /> : undefined}
					textAlign="right"
					value={searchText}
					onChangeText={(text) => onChangeSearchText(text)}
				/>
			</Box>
		</Box>
	)
}

export default Header
