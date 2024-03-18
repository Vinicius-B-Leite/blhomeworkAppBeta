import { Box, Icon, Input, PressableBox } from "@/components"
import React from "react"

type HeaderProps = {
	onBackPress: () => void
}
const Header: React.FC<HeaderProps> = ({ onBackPress }) => {
	return (
		<Box flexDirection="row" alignItems="center" gap={14}>
			<PressableBox p={8} onPress={onBackPress}>
				<Icon name="left" />
			</PressableBox>

			<Box flex={1}>
				<Input
					placeholder="Search"
					RightIcon={<Icon name="search" />}
					textAlign="right"
				/>
			</Box>
		</Box>
	)
}

export default Header
