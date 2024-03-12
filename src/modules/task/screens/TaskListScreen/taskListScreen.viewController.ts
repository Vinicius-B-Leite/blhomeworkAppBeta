import { useAuth } from "@/modules/auth/context"

type UseTaskListScreenViewControllerProps = {
	classroomAdminId: string
}
export function useTaskListScreenViewController({
	classroomAdminId,
}: UseTaskListScreenViewControllerProps) {
	const { user } = useAuth()

	return {
		currentUserIsAdmin: user!.uid == classroomAdminId,
	}
}
