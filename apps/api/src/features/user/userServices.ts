import { prisma } from "@/connection";

export const updateProfile = async (uid: string, profileData: any, images: any) => {
    return await prisma.$transaction(async (prisma) => {
        const checkDuplicateDisplayName = await prisma.users.findMany({
            where: {
                NOT: {
                    uid: uid
                },
                AND: {
                    display_name: profileData.display_name
                }
            }
        })

        if (checkDuplicateDisplayName.length) {
            throw new Error('Username already registered!')
        }

        if (images) {
            const imagesToCreate: any = []
            images.forEach((item: any) => {
                imagesToCreate.push(item.path)
            })
            return await prisma.users.update({
                where: {
                    uid: uid
                },
                data: {
                    display_name: profileData.display_name,
                    image_url: `http://localhost:8000/${imagesToCreate[0]}`
                }
            })
        }

        return await prisma.users.update({
            where: {
                uid: uid
            },
            data: {
                display_name: profileData.display_name
            }
        })
    })
}

export const checkHasTenant = async (uid: string, rolesId: number) => {
    const checkUserHasTenant = await prisma.tenants.findMany({
        where: {
            usersId: uid
        }
    })

    if (!checkUserHasTenant.length) {
        return;
    }

    if (rolesId === 1) {
        return await prisma.users.update({
            where: {
                uid
            }, data: {
                rolesId: 2
            }
        })

    }

    if (rolesId === 2) {
        return await prisma.users.update({
            where: {
                uid
            }, data: {
                rolesId: 1
            }
        })
    }
}

export const getTenantByUid = async (uid: string) => {
    return await prisma.tenants.findUnique({
        where: {
            usersId: uid
        }
    })
}
