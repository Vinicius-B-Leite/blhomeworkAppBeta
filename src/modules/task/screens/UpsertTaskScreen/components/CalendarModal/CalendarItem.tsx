import React, { memo } from "react"
import { CalendarItemProps } from "./calendarTypes"
import { PressableBox, Text } from "@/components"

const CalendarItem: React.FC<CalendarItemProps> = ({
	calendarData,
	handleSelectDay,
	item,
	isSelectedDay,
	selectedMonth,
}) => {
	const isDayName = calendarData.indexOf(item) < 7
	const isToday =
		item === new Date().getDate().toString() &&
		selectedMonth === new Date().getMonth()

	const currentDayColor = isSelectedDay && "text"
	const todayColor = isToday && "contrast"
	const dayNameColor = isDayName && "text"
	const dayNumberColor = !isDayName && "secondText"

	return (
		<PressableBox
			flex={1}
			bg={isSelectedDay ? "contrast" : undefined}
			alignItems="center"
			borderRadius={9999}
			onPress={() => handleSelectDay(Number(item))}>
			<Text
				preset={isDayName ? "pMedium" : "pSmall"}
				color={
					currentDayColor ||
					todayColor ||
					dayNameColor ||
					dayNumberColor ||
					"text"
				}>
				{item}
			</Text>
		</PressableBox>
	)
}

export default memo(CalendarItem, (prevProps, nextProps) =>
	Object.is(prevProps.isSelectedDay, nextProps.isSelectedDay)
)
