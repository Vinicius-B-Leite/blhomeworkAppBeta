import { Box, Container, FormInput, Text } from "@/components"

import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker"
import { useUpsertSubjectScreenViewController } from "./upsertSubjectScreen.viewController"
import { useAppTheme } from "@/hooks"
import { formatDate } from "@/utils"

export const UpsertSubjectScreen: React.FC = () => {
	const {
		onSelectColor,
		selectedColor,
		subjectName,
		control,
		shortName,
		handleCreateSubject,
		isLoading,
		isUpdate,
		subject,
	} = useUpsertSubjectScreenViewController()
	const theme = useAppTheme()

	return (
		<Container
			scrollable
			submitButton={{
				onPress: () => handleCreateSubject(),
				isLoading: isLoading,
				title: isUpdate ? "Salvar" : "Criar",
			}}
			goBack={{
				title: isUpdate ? "Atualizar Disciplina" : "Criar Disciplina",
			}}>
			<Box testID="colorPicker">
				<ColorPicker
					style={{ width: "100%", marginTop: theme.spacing[36] }}
					value={isUpdate ? subject!.color : "red"}
					onComplete={onSelectColor}>
					<Panel1 thumbSize={20} />

					<Box flexDirection="row" alignItems="center" gap={14} mt={14}>
						<Box
							width={60}
							height={60}
							borderRadius={9999}
							style={{ backgroundColor: selectedColor }}
						/>
						<Box flex={1} gap={8}>
							<HueSlider
								thumbShape="doubleTriangle"
								thumbColor={theme.colors.text}
							/>
							<FormInput
								control={control}
								name="color"
								placeholder="rgb(0, 0, 0)"
							/>
						</Box>
					</Box>
				</ColorPicker>
			</Box>

			<Box flexDirection="row" gap={14} marginVertical={24} flexWrap="wrap">
				<Box flex={0.3}>
					<FormInput
						control={control}
						name="shortName"
						placeholder="MAT"
						maxLength={3}
					/>
				</Box>
				<Box flex={0.7}>
					<FormInput control={control} name="name" placeholder="Matemática" />
				</Box>
			</Box>

			<Text preset="pLarge">Pré-visualização</Text>
			<Box
				flexDirection="row"
				alignItems="center"
				paddingHorizontal={14}
				paddingVertical={8}
				borderRadius={8}
				gap={14}
				marginVertical={14}
				style={{ backgroundColor: selectedColor }}>
				<Text preset="tMediumBold" textTransform="uppercase">
					{shortName}
				</Text>
				<Box flex={1}>
					<Text preset="pMedium" numberOfLines={1}>
						{subjectName}
					</Text>
					<Text preset="pSmall">{formatDate(new Date())}</Text>
				</Box>
			</Box>
		</Container>
	)
}
