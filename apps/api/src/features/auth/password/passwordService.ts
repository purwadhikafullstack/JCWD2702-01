import { prisma } from "@/connection";

export const findAccountByEmail = async (email: string) => {
    const findUserByEmail = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (!findUserByEmail) {
        throw new Error('Account not Found')
    }
    if (findUserByEmail.providersId === 2) {
        throw new Error('This account uses social login')
    }
    return findUserByEmail
}

export const updateUserPassword = async ({ uid, password }: { uid: string, password: string }) => {
    await prisma.users.update({
        where: {
            uid: uid
        },
        data: {
            password: password
        }
    })
}