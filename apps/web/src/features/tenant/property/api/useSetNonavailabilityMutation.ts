import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSetNonavailabilityMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ room_types_id, start_date, end_date }: any) => {
            return await axiosInstance.post('/property/set-nonavailability', { room_types_id, start_date, end_date })
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}