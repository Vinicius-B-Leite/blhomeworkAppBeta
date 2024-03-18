import { Box, Icon, Input, PressableBox } from "@/components"
import React from "react"

const Header: React.FC = () => {
	return (
		<Box flexDirection="row" alignItems="center" gap={14}>
			<PressableBox p={8}>
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
