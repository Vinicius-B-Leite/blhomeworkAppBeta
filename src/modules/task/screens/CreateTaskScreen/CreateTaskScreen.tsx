import { Box, Container, FormInput, Icon, Input } from "@/components"
import React from "react"
import Options from "./components/Options/Options"

import { useCreateTaskViewController } from "./createTaskScreen.viewController"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate } from "@/utils"
import { useAppTheme } from "@/hooks"

export const CreateTaskScreen: React.FC = () => {
	const {
		control,
		errors,
		isValid,
		handleCreateTask,
		deadLine,
		handleSelectDate,
		showDatePicker,
		closeDatePicker,
		openDatePicker,
		subject,
		navigateToSubjects,
	} = useCreateTaskViewController()
	const theme = useAppTheme()
	return (
		<Container
			scrollable
			submitButton={{
				onPress: handleCreateTask,
			}}
			goBack={{
				title: "Criar Tarefa",
			}}>
			<FormInput
				control={control}
				name="title"
				placeholder="Título"
				boxProps={{
					mt: 36,
				}}
			/>

			<Input
				value={subject?.name}
				placeholder="Disciplina"
				RightIcon={<Icon name="down" size={30} />}
				editable={false}
				onPress={navigateToSubjects}
				boxProps={{
					mt: 24,
				}}
				style={{
					color: subject ? subject.color : theme.colors.text,
				}}
				errorMessage={errors.subject?.message}
			/>

			<FormInput
				control={control}
				name="description"
				placeholder="Descrição"
				multiline
				textAlignVertical="top"
				boxProps={{
					mt: 24,
					height: 300,
				}}
			/>

			<Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
				<Options
					icon={{
						name: "upload",
						size: 26,
					}}
					text="Material de apoio"
					onPress={() => console.log("lerolero")}
					errorMessage={errors.uploads?.message}
				/>

				<Options
					icon={{
						name: "calendar",
						size: 24,
					}}
					text={deadLine ? formatDate(deadLine) : "Entrega"}
					onPress={openDatePicker}
					errorMessage={errors.deadLine?.message}
				/>
			</Box>

			{showDatePicker && (
				<DateTimePicker
					testID="dateTimePicker"
					value={deadLine ?? new Date()}
					onChange={(_, date) => {
						if (date) {
							handleSelectDate(date)
						}
						closeDatePicker()
					}}
				/>
			)}
		</Container>
	)
}
