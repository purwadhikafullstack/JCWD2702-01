import { useSetNonavailabilityMutation } from "../api/useSetNonavailabilityMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const useSetNonavailability = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { mutate: mutationSetNonavailability } = useSetNonavailabilityMutation({
        onSuccess: (res: any) => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: ['my-listings'] });
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
        mutationSetNonavailability
    }
}