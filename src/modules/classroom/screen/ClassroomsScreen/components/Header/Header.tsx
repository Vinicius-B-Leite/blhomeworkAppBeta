import { Box, CircleImage, Icon, PressableBox, Text } from "@/components"
import React from "react"

type HeaderProps = {
	onPress: () => void
}
const Header: React.FC<HeaderProps> = ({ onPress }) => {
	return (
		<PressableBox
			onPress={onPress}
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			gap={12}
			mb={20}>
			<Box flex={1} flexDirection="row" alignItems="center" gap={12}>
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
			</Box>

			<PressableBox>
				<Icon name="sun" size={30} />
			</PressableBox>
		</PressableBox>
	)
}

export default Header