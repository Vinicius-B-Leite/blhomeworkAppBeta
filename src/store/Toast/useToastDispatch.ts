import { useZustandToast } from "./useZustandToast"

export const useToastDispatch = () =>
	useZustandToast((state) => ({
		hideToast: state.hideToast,
		showToast: state.showToast,
	}))
