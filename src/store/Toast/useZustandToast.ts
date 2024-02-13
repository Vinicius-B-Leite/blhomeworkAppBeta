import { create } from "zustand"

export type ToastConfig = {
	type: "success" | "error" | "warning"
	message: string
	visible: boolean
}

export type UseToast = {
	config: ToastConfig
	showToast: ({ message, type }: Omit<ToastConfig, "visible">) => void
	hideToast: () => void
}

export const useZustandToast = create<UseToast>((set) => ({
	config: {
		message: "",
		type: "success",
		visible: false,
	},
	showToast: ({ message, type }) => set({ config: { message, type, visible: true } }),
	hideToast: () => set({ config: { message: "", type: "success", visible: false } }),
}))
