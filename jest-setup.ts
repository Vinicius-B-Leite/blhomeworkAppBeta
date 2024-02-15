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
