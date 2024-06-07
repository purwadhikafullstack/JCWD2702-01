import { prisma } from "@/connection"

export const getUserByUid = async (uid: any) => {
    return await prisma.users.findUnique({
        where: {
            uid: uid
        }
    })
}

export const registerTenant = async (uid: string, tenantData: any, images: any) => {
    return await prisma.$transaction(async (prisma) => {
        const checkDuplicateDisplayName = await prisma.tenants.findUnique({
            where: {
                display_name: tenantData.display_name
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
                    rolesId: 2
                }
            })
            return await prisma.tenants.create({
                data: {
                    display_name: tenantData.display_name,
                    image_url: `http://localhost:8000/${imagesToCreate[0]}`,
                    id_card_number: tenantData.id_card_number,
                    phone: tenantData.phone,
                    usersId: uid
                }
            })
        } else {
            await prisma.users.update({
                where: {
                    uid: uid
                },
                data: {
                    rolesId: 2
                }
            })
            return await prisma.tenants.create({
                data: {
                    display_name: tenantData.display_name,
                    id_card_number: tenantData.id_card_number,
                    phone: tenantData.phone,
                    usersId: uid
                }
            })
        }
    })
}

export const updateProfile = async (uid: string, profileData: any, images: any) => {
    return await prisma.$transaction(async (prisma) => {
        const checkDuplicateDisplayName = await prisma.tenants.findMany({
            where: {
                NOT: {
                    usersId: uid
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
            return await prisma.tenants.update({
                where: {
                    usersId: uid
                },
                data: {
                    display_name: profileData.display_name,
                    image_url: `http://localhost:8000/${imagesToCreate[0]}`
                }
            })
        }

        return await prisma.tenants.update({
            where: {
                usersId: uid
            },
            data: {
                display_name: profileData.display_name
            }
        })

    })
}