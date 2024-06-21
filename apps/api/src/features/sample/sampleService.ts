import { prisma } from "@/connection"

export const getCategoryData = async () => {
    return await prisma.categories.findMany()
}

export const getFacilitiesData = async () => {
    return await prisma.facilities.findMany()
}