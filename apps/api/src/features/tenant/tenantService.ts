import { prisma } from '@/connection';

export const getUserByUid = async (uid: any) => {
  return await prisma.users.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const registerTenant = async (
  uid: string,
  tenantData: any,
  images: any,
) => {
  return await prisma.$transaction(async (prisma) => {
    const checkDuplicateDisplayName = await prisma.tenants.findUnique({
      where: {
        display_name: tenantData.display_name,
      },
    });

    if (checkDuplicateDisplayName) {
      throw new Error('Username already registered!');
    }

    if (images) {
      const imagesToCreate: any = [];
      images.forEach((item: any) => {
        imagesToCreate.push(item.path);
      });

      await prisma.users.update({
        where: {
          uid: uid,
        },
        data: {
          rolesId: 2,
        },
      });
      return await prisma.tenants.create({
        data: {
          display_name: tenantData.display_name,
          image_url: `${process.env.SERVER_URL as string}/${imagesToCreate[0]}`,
          id_card_number: tenantData.id_card_number,
          phone: tenantData.phone,
          usersId: uid,
        },
      });
    } else {
      await prisma.users.update({
        where: {
          uid: uid,
        },
        data: {
          rolesId: 2,
        },
      });
      return await prisma.tenants.create({
        data: {
          display_name: tenantData.display_name,
          id_card_number: tenantData.id_card_number,
          phone: tenantData.phone,
          usersId: uid,
        },
      });
    }
  });
};

export const updateProfile = async (
  uid: string,
  profileData: any,
  images: any,
) => {
  return await prisma.$transaction(async (prisma) => {
    const existingProfile = await prisma.tenants.findUnique({
      where: {
        usersId: uid,
      },
    });

    if (!existingProfile) {
      throw new Error('Profile not found!');
    }

    const checkDuplicateDisplayName = await prisma.tenants.findMany({
      where: {
        NOT: {
          usersId: uid,
        },
        AND: {
          display_name: profileData.display_name,
        },
      },
    });

    if (checkDuplicateDisplayName.length) {
      throw new Error('Username already registered!');
    }

    const updatedData = {
      display_name: profileData.display_name || existingProfile.display_name,
      image_url: existingProfile.image_url,
    };

    if (images) {
      const imagesToCreate = images.map((item: any) => item.path);
      updatedData.image_url = `${process.env.SERVER_URL as string}/${imagesToCreate[0]}`;
    }
    return await prisma.tenants.update({
      where: {
        usersId: uid,
      },
      data: updatedData,
    });
  });
};

export const createListing = async (
  uid: string,
  listingData: any,
  roomTypeData: any,
  listingImages: any,
  roomtypeImages: any,
) => {
  return await prisma.$transaction(async (prisma) => {
    const findTenant = await prisma.tenants.findUnique({
      where: {
        usersId: uid,
      },
    });
    if (findTenant) {
      const createdListing = await prisma.listings.create({
        data: {
          title: listingData.title,
          description: listingData.description,
          country: listingData.country,
          tenantsId: findTenant?.id,
          categoriesId: listingData.categoriesId,
          address: listingData.address,
          contact_person: listingData.contact_person,
          location_coordinate: listingData.location_coordinate,
          city: listingData.city,
        },
      });
      const createListingSlug = await prisma.listings.update({
        where: {
          id: createdListing.id,
        },
        data: {
          slug: `${createdListing.title} ${createdListing.id}`
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-'),
        },
      });
      const listingImagesToCreate: any = [];
      listingImages.forEach((item: any) => {
        listingImagesToCreate.push({
          image_url: `${process.env.SERVER_URL as string}/${item.path}`,
          listingsId: createdListing.id,
        });
      });
      await prisma.listing_images.createMany({
        data: [...listingImagesToCreate],
      });
      if (createdListing) {
        if (listingData.listing_facilities) {
          const listing_facilities: any = [];
          listingData.listing_facilities.forEach((item: any) => {
            listing_facilities.push({
              listingsId: createdListing.id,
              facilitiesId: item,
            });
          });
          await prisma.listing_facilities.createMany({
            data: listing_facilities,
          });
        }
        const createdRoomTypes: any = [];
        for (const item of roomTypeData) {
          const createdRoomType = await prisma.room_types.create({
            data: {
              name: item.name,
              stock: item.stock,
              capacity: item.capacity,
              bed_details: item.bed_details,
              price: item.price,
              listingsId: createdListing.id,
              has_breakfast_option: item.has_breakfast_option,
              breakfast_price: item.breakfast_price,
            },
          });
          createdRoomTypes.push(createdRoomType);
          if (item.room_facilities) {
            const room_facilities = item.room_facilities.map(
              (facilityId: number) => ({
                room_typesId: createdRoomType.id,
                facilitiesId: facilityId,
              }),
            );

            await prisma.room_facilities.createMany({
              data: room_facilities,
            });
          }
        }

        if (roomtypeImages && roomtypeImages.length > 0) {
          const roomtypeImagesToCreate: any = [];
          roomtypeImages.forEach((item: any, index: any) => {
            roomtypeImagesToCreate.push({
              image_url: `${process.env.SERVER_URL as string}/${item.path}`,
              room_typesId: createdRoomTypes[index].id,
            });
          });
          await prisma.room_images.createMany({
            data: [...roomtypeImagesToCreate],
          });
        }
      }
      return await prisma.listings.findUnique({
        where: {
          id: createdListing.id,
        },
        include: {
          tenant: true,
          category: true,
          listing_facilities: {
            include: {
              facility: true,
            },
          },
          listing_images: true,
          room_types: {
            include: {
              room_facilities: true,
              room_images: true,
              seasonal_prices: true,
              bookings: {
                include: {
                  status: true,
                },
              },
            },
          },
        },
      });
    }
  });
};

export const findMyListing = async (tenantsId: string) => {
  return await prisma.listings.findMany({
    where: {
      tenantsId: tenantsId,
    },
    include: {
      tenant: true,
      category: true,
      listing_facilities: {
        include: {
          facility: true,
        },
      },
      listing_images: true,
      room_types: {
        include: {
          room_facilities: true,
          room_images: true,
          seasonal_prices: true,
          nonavailability: true,
          bookings: {
            include: {
              status: true,
            },
          },
        },
      },
    },
  });
};

export const deleteMyListing = async (listingId: string) => {
  await prisma.$transaction(async (prisma) => {
    const listingRoomtypes = await prisma.room_types.findMany({
      where: {
        listingsId: listingId,
      },
      include: {
        room_facilities: true,
        room_images: true,
      },
    });

    await prisma.listing_images.deleteMany({
      where: {
        listingsId: listingId,
      },
    });

    await prisma.listing_facilities.deleteMany({
      where: {
        listingsId: listingId,
      },
    });

    for (const roomtype of listingRoomtypes) {
      await prisma.room_facilities.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
      await prisma.room_images.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
      await prisma.seasonal_prices.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
      await prisma.nonavailability.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
      await prisma.seasonal_prices.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
      await prisma.bookings.deleteMany({
        where: {
          room_typesId: roomtype.id,
        },
      });
    }

    await prisma.room_types.deleteMany({
      where: {
        listingsId: listingId,
      },
    });

    await prisma.listings.delete({
      where: {
        id: listingId,
      },
    });
  });
};
