import { useState, useEffect } from "react"

export function useDebouncedValue<T>(value: T, delay?: number): T {
	const delayValue = delay ?? 500
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delayValue)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delayValue])

	return debouncedValue
}
