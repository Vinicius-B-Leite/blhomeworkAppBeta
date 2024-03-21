import { IconProps } from "@/components"

import { create } from "zustand"

export type AnimatedHeaderOptionsConfig = {
	title: string
	titleColor: string
	visible: boolean
	rightOptions: {
		iconsName: IconProps["name"]
		onPress: () => void
		isLoading?: boolean
	}[]
}

export type UseAnimatedHeaderOPtions = {
	config: AnimatedHeaderOptionsConfig
	showAnimatedHeaderOptions: ({
		rightOptions,
		title,
	}: Omit<AnimatedHeaderOptionsConfig, "visible">) => void
	hideAnimatedHeaderOptions: () => void
}

export const useZustandAnimatedHeaderOptions = create<UseAnimatedHeaderOPtions>(
	(set) => ({
		config: {
			rightOptions: [],
			title: "",
			visible: false,
			titleColor: "text",
		},
		hideAnimatedHeaderOptions: () =>
			set({
				config: { visible: false, rightOptions: [], title: "", titleColor: "" },
			}),
		showAnimatedHeaderOptions: ({ rightOptions, title, titleColor }) =>
			set({
				config: {
					rightOptions,
					visible: true,
					title,
					titleColor: titleColor || "",
				},
			}),
	})
)
