import React from "react"
import { Box, PressableBox, Text } from "@/components"
import { formatDate } from "@/utils"

type TaskItemProps = {
	task: {
		title: string
		deadLine: Date
		id: string
		subject: {
			name: string
			id: string
			shortName: string
			color: string
		}
	}
}

const TaskItem: React.FC<TaskItemProps> = ({
	task: { id, subject, title, deadLine },
}) => {
	const titleWithCapitalizedFirstLetter = title.charAt(0).toUpperCase() + title.slice(1)
	return (
		<PressableBox
			flexDirection="row"
			alignItems="center"
			paddingHorizontal={14}
			paddingVertical={8}
			borderRadius={8}
			gap={14}
			mb={14}
			style={{ backgroundColor: subject.color }}>
			<Text preset="tMediumBold" textTransform="uppercase">
				{subject.shortName}
			</Text>
			<Box>
				<Text preset="pMedium">{titleWithCapitalizedFirstLetter}</Text>
				<Text preset="pSmall">{formatDate(deadLine)}</Text>
			</Box>
		</PressableBox>
	)
}

export default TaskItem
