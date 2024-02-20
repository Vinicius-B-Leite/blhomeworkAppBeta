import React, { useState } from "react"
import { Input, InputProps } from "./Input"
import { Icon } from "../Icon/Icon"
import { Pressable } from "react-native"

export type PasswordInputProps = Omit<InputProps, "secureTextEntry" | "LeftIcon">
export const PasswordInput: React.FC<PasswordInputProps> = ({ ...rest }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true)
	return (
		<Input
			secureTextEntry={secureTextEntry}
			LeftIcon={
				<Pressable onPress={() => setSecureTextEntry((oldValue) => !oldValue)}>
					<Icon
						name={secureTextEntry ? "eyeOff" : "eyeOn"}
						size={25}
						testID="eyeIcon"
					/>
				</Pressable>
			}
			{...rest}
		/>
	)
}
