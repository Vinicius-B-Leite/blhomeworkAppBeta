import React from "react"
import { useHeader } from "./useHeader"
import { Box, PressableBox } from "../Box/Box"
import { CircleImage } from "../CircleImage/CircleImage"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"

export const Header: React.FC = () => {
	const { handleNavigateToProfile, handleToggleTheme, userName, theme } = useHeader()
	const iconName = theme === "light" ? "sun" : "moon"
	return (
		<Box
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			gap={12}
			mb={20}>
			<PressableBox
				onPress={handleNavigateToProfile}
				flex={1}
				flexDirection="row"
				alignItems="center"
				gap={12}>
				<CircleImage
					size={50}
					source={{ uri: "https://www.github.com/Vinicius-B-Leite.png" }}
				/>
				<Text
					preset="pMediumBold"
					numberOfLines={2}
					ellipsizeMode="tail"
					style={{ flex: 1 }}>
					{userName}
				</Text>
			</PressableBox>

			<PressableBox onPress={handleToggleTheme}>
				<Icon name={iconName} size={30} testID={iconName} />
			</PressableBox>
		</Box>
	)
}
