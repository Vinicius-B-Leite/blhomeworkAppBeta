import { Box, Container, FormInput, Icon, Input, PressableBox, Text } from "@/components"
import React, { useCallback, useRef } from "react"
import Options from "./components/Options/Options"

import { useUpsertTaskViewController } from "./UpsertTaskScreen.viewController"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate } from "@/utils"
import { useAppTheme } from "@/hooks"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import UploadModal from "./components/UploadModal/UploadModal"
import CalendarModal from "./components/CalendarModal/CalendarModal"
import { Platform } from "react-native"

export const UpsertTaskScreen: React.FC = () => {
	const {
		control,
		errors,
		handleCreateTask,
		deadLine,
		handleSelectDate,
		showDatePicker,
		closeDatePicker,
		openDatePicker,
		subject,
		isLoading,
		selectDocuments,
		navigateToSubjects,
		documentList,
		removeDocument,
		isUpdate,
		isBottomSheetOpen,
		bottomSheetRef,
		handleOpenBottomSheet,
		handleCloseBottomSheet,
	} = useUpsertTaskViewController()

	const theme = useAppTheme()
	const isWeb = Platform.OS === "web"
	return (
		<>
			<Container
				zIndex={2}
				scrollable
				submitButton={{
					onPress: handleCreateTask,
					isLoading: isLoading,
					title: isUpdate ? "Salvar" : "Criar",
				}}
				goBack={{
					title: isUpdate ? "Atualizar Tarefa" : "Criar Tarefa",
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
						onPress={handleOpenBottomSheet}
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

				<CalendarModal
					date={deadLine ?? new Date()}
					onDateSave={(date) => date && handleSelectDate(date)}
					closeCalendar={closeDatePicker}
					visible={showDatePicker}
				/>
			</Container>

			{isBottomSheetOpen && (
				<PressableBox
					onPress={handleCloseBottomSheet}
					width={"100%"}
					height={"100%"}
					flex={1}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					}}
				/>
			)}
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={["80%"]}
				onClose={handleCloseBottomSheet}
				enablePanDownToClose
				enableHandlePanningGesture={!isWeb}
				enableContentPanningGesture={false}
				index={-1}
				backgroundStyle={{
					backgroundColor: theme.colors.secondsBg,
				}}
				style={{ zIndex: 10 }}
				handleIndicatorStyle={{
					backgroundColor: theme.colors.text,
					width: "50%",
					display: isWeb ? "none" : "flex",
					marginVertical: theme.spacing[12],
				}}
				handleStyle={{
					backgroundColor: theme.colors.secondsBg,
				}}>
				<>
					{isWeb && (
						<PressableBox
							onPress={handleCloseBottomSheet}
							ml={24}
							alignSelf="flex-start">
							<Icon name="close" size={34} />
						</PressableBox>
					)}
					<UploadModal
						removeDocument={removeDocument}
						uploads={documentList}
						selectDocuments={selectDocuments}
					/>
				</>
			</BottomSheet>
		</>
	)
}
