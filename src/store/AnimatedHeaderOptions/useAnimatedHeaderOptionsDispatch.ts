import { useZustandAnimatedHeaderOptions } from "./useZustandAnimatedHeaderOptions"

export const useAnimatedHeaderOptionsDispatch = () =>
	useZustandAnimatedHeaderOptions((state) => ({
		hideAnimatedHeaderOptions: state.hideAnimatedHeaderOptions,
		showAnimatedHeaderOptions: state.showAnimatedHeaderOptions,
		isVisible: state.config.visible,
	}))
