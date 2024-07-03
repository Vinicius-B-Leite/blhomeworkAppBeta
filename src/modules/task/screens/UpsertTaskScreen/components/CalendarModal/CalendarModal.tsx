import { Box, Container, Icon, PressableBox, Text } from "@/components"
import { months } from "@/modules/task/constants"
import React from "react"
import { FlatList, Modal, Platform } from "react-native"
import { CalendarProps } from "./calendarTypes"
import { useCalendar } from "./useCalender"
import MonthItem from "./MonthItem"
import CalendarItem from "./CalendarItem"
import { useAppTheme } from "@/hooks"

const CalendarModal: React.FC<CalendarProps> = ({
	closeCalendar,
	date,
	onDateSave,
	visible,
}) => {
	const {
		handleSelectMonth,
		handleSelectDay,
		toggleShowMonthsSelector,
		selectedDay,
		selectedMonth,
		showMonthsSelector,
		calendarData,
		handleSaveDate,
		top,
	} = useCalendar({ closeCalendar, onDateSave })
	const theme = useAppTheme()

	return (
		<Modal onRequestClose={closeCalendar} animationType="slide" visible={visible}>
			<Box
				bg="bg"
				flex={1}
				paddingHorizontal={24}
				style={{
					paddingTop:
						Platform.OS === "ios"
							? top + theme.spacing[12]
							: theme.spacing[12],
				}}>
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					gap={14}>
					<PressableBox
						onPress={closeCalendar}
						flex={1}
						flexDirection="row"
						alignItems="center"
						gap={14}>
						<Icon name="left" size={24} />
						<Text preset="tSmallBold" numberOfLines={1} style={{ flex: 1 }}>
							Data de entrega
						</Text>
					</PressableBox>

					<PressableBox onPress={handleSaveDate}>
						<Text preset="pMedium" color="contrast">
							salvar
						</Text>
					</PressableBox>
				</Box>
				<Box mt={50} mb={24}>
					<Text preset="pMedium">Data selecionada</Text>
					<Text preset="tMedium">
						{selectedDay} de {months[selectedMonth].toLowerCase()}
					</Text>
				</Box>

				<PressableBox
					flexDirection="row"
					alignItems="center"
					onPress={toggleShowMonthsSelector}>
					<Text preset="pMedium" testID="selected-month">
						{months[selectedMonth]}
					</Text>
					<Icon name="down" size={24} />
				</PressableBox>
				<Box flex={1} mt={14}>
					{showMonthsSelector ? (
						<FlatList
							key={"monthList"}
							data={months}
							columnWrapperStyle={{
								justifyContent: "space-evenly",
								alignItems: "center",
							}}
							numColumns={3}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ index, item }) => (
								<MonthItem
									handleSelectMonth={handleSelectMonth}
									index={index}
									isSelected={selectedMonth === index}
									month={item}
								/>
							)}
						/>
					) : (
						<FlatList
							key={"calendarList"}
							data={calendarData}
							columnWrapperStyle={{
								justifyContent: "space-between",
								paddingVertical: 8,
							}}
							numColumns={7}
							keyExtractor={(item, index) => item + index.toString()}
							renderItem={({ item }) => (
								<CalendarItem
									calendarData={calendarData}
									handleSelectDay={handleSelectDay}
									item={item}
									isSelectedDay={selectedDay === Number(item)}
									selectedMonth={selectedMonth}
								/>
							)}
						/>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default CalendarModal
