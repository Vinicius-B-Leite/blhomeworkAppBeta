export type CalendarProps = {
	date: Date
	onDateSave: (date: Date | null) => void
	closeCalendar: () => void
	visible: boolean
}

export type MonthItemProps = {
	handleSelectMonth: (month: number) => void
	isSelected: boolean
	month: string
	index: number
}

export type CalendarItemProps = {
	calendarData: string[]
	item: string
	selectedMonth: number
	isSelectedDay: boolean
	handleSelectDay: (day: number) => void
}
