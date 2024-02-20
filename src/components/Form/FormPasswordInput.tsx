import React from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"

import { PasswordInput, PasswordInputProps } from "../Input/PasswordInput"

type FormInputProps<T extends FieldValues> = Omit<
	PasswordInputProps,
	"value" | "onChangeText"
> &
	UseControllerProps<T>

export const FormPasswordInput = <T extends FieldValues>({
	errorMessage,
	control,
	name,
	...inputProps
}: FormInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<PasswordInput
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={errorMessage || fieldState.error?.message}
					{...inputProps}
				/>
			)}
		/>
	)
}
