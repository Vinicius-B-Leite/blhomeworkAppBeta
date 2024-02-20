export type CoumnModelViewProps<ErrorProps, SuccessProps> = {
	onError?: (errorFormated: ErrorProps) => void
	onSuccess?: (props: SuccessProps) => void
}
