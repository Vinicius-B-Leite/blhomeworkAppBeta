import { formatDate } from "../formatDate"

describe("utils: formatDate", () => {
	it("returns the date in dd/mm/yyyy format", () => {
		const date = new Date(2022, 0, 1) // 1 de janeiro de 2022
		const formattedDate = formatDate(date)
		expect(formattedDate).toBe("01/01/2022")
	})

	it("pads single digit day and month with zero", () => {
		const date = new Date(2022, 8, 9) // 9 de setembro de 2022
		const formattedDate = formatDate(date)
		expect(formattedDate).toBe("09/09/2022")
	})
})
