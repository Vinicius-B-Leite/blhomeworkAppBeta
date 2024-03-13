import React from "react"
import { useHeader } from "./useHeader"
import { Box, PressableBox } from "../Box/Box"
import { CircleImage } from "../CircleImage/CircleImage"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"

export const Header: React.FC = () => {
	const { handleNavigateToProfile, handleToggleTheme } = useHeader()
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
					fulano fulano fulano
				</Text>
			</PressableBox>

			<PressableBox onPress={handleToggleTheme}>
				<Icon name="sun" size={30} />
			</PressableBox>
		</Box>
	)
}
