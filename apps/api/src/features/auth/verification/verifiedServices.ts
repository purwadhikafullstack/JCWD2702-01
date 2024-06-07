import { prisma } from "@/connection";
import { HashPassword } from "@/helpers/Hashing";
import { IVerifiedUserAccount } from "./verifiedType";

export const VerifiedAccount = async (uid: string, userData: any, images: any) => {
    const hashedPassword = await HashPassword({ password: userData.password })

    return await prisma.$transaction(async (prisma) => {

        const checkDuplicateDisplayName = await prisma.users.findUnique({
            where: {
                display_name: userData.display_name
            }
        })

        if (checkDuplicateDisplayName) {
            throw new Error('Username already registered!')
        }

        if (images) {
            const imagesToCreate: any = []
            images.forEach((item: any) => {
                imagesToCreate.push(item.path)
            })

            await prisma.users.update({
                where: {
                    uid: uid
                },
                data: {
                    image_url: `http://localhost:8000/${imagesToCreate[0]}`
                }
            })

        }
        return await prisma.users.update({
            where: {
                uid: uid
            },
            data: {
                display_name: userData.display_name,
                password: hashedPassword,
                is_verified: true,
            }
        })
    })
}

export const searchUserByEmail = async ({ email }: { email: any }) => {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    })
}
