import React from "react"
import { Box, PressableBox, Text } from "@/components"
import { formatDate } from "@/utils"
import { Task } from "@/modules/task/model"

type TaskItemProps = {
	task: Task
	onPress: () => void
	onLongPress: () => void
	shouldShowDarkMask?: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onPress,
	onLongPress,
	shouldShowDarkMask = false,
}) => {
	const { title, subject, deadLine } = task
	const titleWithCapitalizedFirstLetter = title.charAt(0).toUpperCase() + title.slice(1)
	return (
		<>
			<PressableBox
				onPress={() => onPress()}
				onLongPress={onLongPress}
				flexDirection="row"
				alignItems="center"
				paddingHorizontal={14}
				paddingVertical={8}
				borderRadius={8}
				gap={14}
				mb={14}
				style={{ backgroundColor: subject.color, position: "relative" }}>
				<Text preset="tMediumBold" textTransform="uppercase">
					{subject.shortName}
				</Text>
				<Box>
					<Text preset="pMedium">{titleWithCapitalizedFirstLetter}</Text>
					<Text preset="pSmall">{formatDate(deadLine)}</Text>
				</Box>
			</PressableBox>
			{shouldShowDarkMask && (
				<PressableBox
					onPress={() => onPress()}
					onLongPress={onLongPress}
					borderRadius={8}
					width={"100%"}
					height={"85%"}
					bg="black03"
					style={{
						position: "absolute",
					}}
				/>
			)}
		</>
	)
}

export default TaskItem
