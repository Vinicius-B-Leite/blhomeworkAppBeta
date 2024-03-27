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
	onClose?: () => void
}

type showAnimatedHeaderOptionsProps = Omit<AnimatedHeaderOptionsConfig, "visible"> & {
	onClose?: () => void
}
export type UseAnimatedHeaderOPtions = {
	config: AnimatedHeaderOptionsConfig
	showAnimatedHeaderOptions: ({
		rightOptions,
		title,
	}: showAnimatedHeaderOptionsProps) => void
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
		showAnimatedHeaderOptions: ({ titleColor, ...rest }) =>
			set({
				config: {
					visible: true,
					titleColor: titleColor || "",
					...rest,
				},
			}),
	})
)
