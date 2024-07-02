import { prisma } from "@/connection"


export const findUserByEmail = async ({ email }: { email: string }) => {
    const findUser = await prisma.users.findUnique({
        where: {
            email: email,
        }
    })

    if (!findUser) {
        throw new Error("User not found!")
    }

    return findUser
}