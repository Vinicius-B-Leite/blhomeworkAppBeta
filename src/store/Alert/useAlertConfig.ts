import { useZustandAlert } from "./useZustandAlert"

export const useAlertConfig = () => {
	return useZustandAlert((state) => state.config)
}
