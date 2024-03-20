import "@testing-library/react-native/extend-expect"

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext)
require("react-native-reanimated").setUpTests()

jest.mock("@supabase/supabase-js", () => {
	return {
		createClient: jest.fn().mockImplementation(() => {
			return {
				auth: {
					signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
				},
			}
		}),
	}
})

jest.mock("@react-native-async-storage/async-storage", () =>
	require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("@gorhom/bottom-sheet", () => ({
	__esModule: true,
	...require("@gorhom/bottom-sheet/mock"),
}))

jest.mock("@react-native-community/datetimepicker", () => {
	const React = require("React")
	const RealComponent = jest.requireActual("@react-native-community/datetimepicker")

	class Picker extends React.Component {
		render() {
			return React.createElement("Picker", this.props, this.props.children)
		}
	}

	Picker.propTypes = RealComponent.propTypes
	return Picker
})
