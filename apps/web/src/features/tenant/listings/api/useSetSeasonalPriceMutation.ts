import { axiosInstance } from '@/utils/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

export const useSetSeasonalPriceMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ price, room_types_id, start_date, end_date }: any) => {
            await axiosInstance.post('/tenant/set-seasonal-price', { price, room_types_id, start_date, end_date });
        },
        onSuccess,
        onError,
    });

    return {
        mutate,
    };
};