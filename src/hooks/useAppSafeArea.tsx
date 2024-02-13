import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "./useAppTheme"

export const useAppSafeArea = () => {
	const { bottom, top } = useSafeAreaInsets()
	const theme = useAppTheme()

	const paddingTop = Math.max(top, theme.spacing[14])
	const paddingBottom = Math.max(bottom, theme.spacing[14])

	return {
		top: paddingTop,
		bottom: paddingBottom,
	}
}
