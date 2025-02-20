export const useEvent = () => {
	const emmitEvent = () => {
		console.log("event")
	}

	return {
		emmitEvent,
	}
}
