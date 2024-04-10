import { create } from "zustand"

type AlertButtonType = "confirm" | "cancel"

type AlertButton = {
	type: AlertButtonType
	text?: string
	onPress?: () => void
}

type AlertConfig = {
	title?: string
	message: string
	buttons: AlertButton[]
	visible: boolean
}

type UseAlert = {
	config: AlertConfig
	showAlert: (props: Omit<AlertConfig, "visible">) => void
	hideAlert: () => void
}

export const useZustandAlert = create<UseAlert>((set) => ({
	config: {
		title: "",
		message: "",
		buttons: [],
		visible: false,
	},
	hideAlert: () =>
		set({ config: { visible: false, buttons: [], message: "", title: "" } }),
	showAlert: (props) => set({ config: { ...props, visible: true } }),
}))
