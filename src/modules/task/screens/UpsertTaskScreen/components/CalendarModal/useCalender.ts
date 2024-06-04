import { week } from "@/modules/task/constants"
import { useCallback, useMemo, useState } from "react"

type useCalendarProps = {
	onDateSave: (date: Date | null) => void
	closeCalendar: () => void
}
export function useCalendar({ closeCalendar, onDateSave }: useCalendarProps) {
	const [showMonthsSelector, setShowMonthsSelector] = useState(false)
	const [selectedDay, setSelectedDay] = useState<null | number>(new Date().getDate())
	const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())

	const calendarData = useMemo(() => {
		const lastDayMonthInNumber = new Date(
			new Date(new Date().setMonth(selectedMonth + 1)).setDate(0)
		).getDate()
		const lastDayMonthInWeek = new Date(
			new Date(new Date().setMonth(selectedMonth + 1)).setDate(0)
		).getDay()

		const dayOfWeek = new Date(
			new Date(new Date(new Date().setDate(1))).setMonth(selectedMonth)
		).getDay()

		const emptyInitialDays = Array.from({ length: dayOfWeek }, () => "")
		const numberDays = Array.from({ length: lastDayMonthInNumber }, (_, i) =>
			(i + 1).toString()
		)
		const emptyFinalDays = Array.from(
			{
				length: 6 - lastDayMonthInWeek,
			},
			() => ""
		)

		return [...week, ...emptyInitialDays, ...numberDays, ...emptyFinalDays]
	}, [selectedMonth])

	const handleSelectMonth = useCallback((month: number) => {
		setSelectedMonth(month)
		setShowMonthsSelector(false)
	}, [])
	const handleSelectDay = useCallback((day: number) => {
		if (day == 0) return

		setSelectedDay(day)
	}, [])
	const toggleShowMonthsSelector = useCallback(() => {
		setShowMonthsSelector((oldValue) => !oldValue)
	}, [])

	const handleSaveDate = () => {
		if (!selectedDay || !selectedMonth) return

		const date = new Date()
		date.setMonth(selectedMonth)
		date.setDate(Number(selectedDay))

		onDateSave(date)
		closeCalendar()
	}
	return {
		handleSelectMonth,
		handleSelectDay,
		toggleShowMonthsSelector,
		showMonthsSelector,
		selectedDay,
		selectedMonth,
		calendarData,
		handleSaveDate,
	}
}
