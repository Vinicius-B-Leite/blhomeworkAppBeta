import { useZustandAnimatedHeaderOptions } from "./useZustandAnimatedHeaderOptions"

export const useAnimatedHeaderOptionsConfig = () =>
	useZustandAnimatedHeaderOptions((state) => state.config)
