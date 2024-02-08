import React from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { Input, InputProps } from "../Input/Input"

type FormInputProps<T extends FieldValues> = Omit<InputProps, "value" | "onChangeText"> &
	UseControllerProps<T>

export const FormInput = <T extends FieldValues>({
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
				<Input
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={errorMessage || fieldState.error?.message}
					{...inputProps}
				/>
			)}
		/>
	)
}
