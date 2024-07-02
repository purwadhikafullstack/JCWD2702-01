import { prisma } from "@/connection"

export const resetRole = async (uid: string) => {
    return await prisma.users.update({
        where: {
            uid: uid
        },
        data: {
            rolesId: 1
        }
    })
}