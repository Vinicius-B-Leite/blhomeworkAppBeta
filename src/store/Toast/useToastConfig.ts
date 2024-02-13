import { useZustandToast } from "./useZustandToast"

export const useToastConfig = () => useZustandToast((state) => state.config)
