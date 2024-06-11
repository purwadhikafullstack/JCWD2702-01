import { prisma } from "@/connection";
import { ISignupUser } from "./signupType";

export const createUser = async ({ uid, email, display_name, is_verified, image_url }: ISignupUser) => {
    const findDuplicateEmail = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (findDuplicateEmail) throw new Error('Email Already Registered!')

    if (!uid) {
        return await prisma.users.create({
            data: {
                email: email,
                providersId: 1
            }
        })
    } else if (uid) {
        return await prisma.users.create({
            data: {
                uid: uid,
                email: email,
                display_name: display_name,
                is_verified: is_verified,
                providersId: 2,
                image_url: image_url
            }
        })

    }
}