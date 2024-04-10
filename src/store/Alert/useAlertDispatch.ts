import { useZustandAlert } from "./useZustandAlert"

export const useAlertDispatch = () => {
	return useZustandAlert((state) => ({
		hideAlert: state.hideAlert,
		showAlert: state.showAlert,
	}))
}
