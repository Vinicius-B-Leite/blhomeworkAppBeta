import { PressableBox, Text } from "@/components"
import React, { memo } from "react"

import { MonthItemProps } from "./calendarTypes"

const MonthItem: React.FC<MonthItemProps> = ({
	handleSelectMonth,
	index,
	isSelected,
	month,
}) => {
	return (
		<PressableBox
			onPress={() => handleSelectMonth(index)}
			alignItems="center"
			flex={1}
			marginVertical={14}
			bg={isSelected ? "contrast" : undefined}
			borderRadius={8}>
			<Text preset="pMedium" color={"text"} textAlign="center">
				{month}
			</Text>
		</PressableBox>
	)
}

export default memo(
	MonthItem,
	(prevProps, nextProps) => prevProps.isSelected !== nextProps.isSelected
)
