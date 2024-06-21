import { useSetSeasonalPriceMutation } from "../api/useSetSeasonalPriceMutation";
import { useToast } from "@/components/ui/use-toast";

export const useSetSeasonalPrice = () => {
    const { toast } = useToast()
    const { mutate: mutationSetSeasonalPrice } = useSetSeasonalPriceMutation({
        onSuccess: (res: any) => {
            console.log(res)
            toast({
                description: `${res.data.message}`
            })
        },
        onError: (err: any) => {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Uh oh something went wrong!",
                description: `${err.response.data.message}`
            })
        }
    })
    return {
        mutationSetSeasonalPrice
    }
}