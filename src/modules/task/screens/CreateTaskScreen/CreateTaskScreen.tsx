import { Box, Container, Icon, Input, PressableBox, Text } from "@/components"
import React, { useCallback } from "react"
import Options from "./components/Options/Options"
import SubmitBt from "./components/SubmitBt/SubmitBtn"

export const CreateTaskScreen: React.FC = () => {
	return (
		<Container
			scrollable
			goBack={{
				title: "Criar Tarefa",
				righComponent: (
					<SubmitBt onPress={() => console.log("lerolero")} isValid={false} />
				),
			}}>
			<Input
				placeholder="Título"
				boxProps={{
					mt: 36,
					mb: 24,
				}}
			/>

			<Input
				placeholder="Disciplina"
				RightIcon={<Icon name="down" size={30} />}
				editable={false}
				onPressOut={() => console.log("lerolero")}
				boxProps={{
					mb: 24,
				}}
			/>

			<Input
				placeholder="Descrição"
				multiline
				textAlignVertical="top"
				boxProps={{
					mb: 24,
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
				/>

				<Options
					icon={{
						name: "calendar",
						size: 24,
					}}
					text="Comentários"
					onPress={() => console.log("lerolero")}
				/>
			</Box>
		</Container>
	)
}
