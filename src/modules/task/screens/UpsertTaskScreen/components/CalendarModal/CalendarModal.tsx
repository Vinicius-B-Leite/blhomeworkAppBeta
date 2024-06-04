import { Box, Container, Icon, PressableBox, Text } from "@/components"
import { months } from "@/modules/task/constants"
import React from "react"
import { FlatList, Modal } from "react-native"
import { CalendarProps } from "./calendarTypes"
import { useCalendar } from "./useCalender"
import MonthItem from "./MonthItem"
import CalendarItem from "./CalendarItem"

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
	} = useCalendar({ closeCalendar, onDateSave })

	return (
		<Modal onRequestClose={closeCalendar} animationType="slide" visible={visible}>
			<Container
				goBack={{
					title: "Data de entrega",
					onPress: closeCalendar,
				}}
				submitButton={{
					title: "salvar",
					onPress: handleSaveDate,
				}}>
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
			</Container>
		</Modal>
	)
}

export default CalendarModal
