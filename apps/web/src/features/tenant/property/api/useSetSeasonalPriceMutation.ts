import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSetSeasonalPriceMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ price, room_types_id, start_date, end_date }: any) => {
            return await axiosInstance.post('/property/set-seasonal-price', { price, room_types_id, start_date, end_date })
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}