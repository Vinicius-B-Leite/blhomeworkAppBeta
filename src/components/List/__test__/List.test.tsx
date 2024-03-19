// FILEPATH: /Users/user/ViniciusLeite/bl-homework/src/components/List/__tests__/List.test.tsx

import React from "react"

import { List } from "../List"
import { Text } from "react-native"
import { render, screen } from "@/testUtils"
import { fireEvent } from "@testing-library/react-native"

describe("List", () => {
	const mockRefresh = jest.fn()
	const mockData = [
		{ id: "1", value: "Item 1" },
		{ id: "2", value: "Item 2" },
	]

	it("should call refresh prop when refreshing", () => {
		render(
			<List
				data={mockData}
				renderItem={({ item }) => <Text>{item.value}</Text>}
				keyExtractor={(item) => item.id}
				isLoading={true}
				refresh={mockRefresh}
			/>
		)
		const list = screen.getByTestId("list")
		fireEvent(list, "refresh")

		expect(mockRefresh).toHaveBeenCalled()
	})
})
