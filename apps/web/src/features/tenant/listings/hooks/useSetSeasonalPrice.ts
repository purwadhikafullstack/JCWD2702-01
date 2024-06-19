'use client'

import { useSetSeasonalPriceMutation } from "../api/useSetSeasonalPriceMutation";
import { useToast } from "@/components/ui/use-toast";

export const useSetSeasonalPrice = () => {
    const { toast } = useToast()

    const { mutate: mutationSetSeasonalPrice } = useSetSeasonalPriceMutation({
        onSuccess: (res: any) => {
            console.log("success")
            console.log(res.data)
        },
        onError: (err: any) => {
            console.log(err)
        }
    })

    return {
        mutationSetSeasonalPrice
    };
}