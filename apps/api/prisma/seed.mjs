import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds = 10;

const roles = [
  {
    role: 'user',
  },
  {
    role: 'tenant',
  },
];

const providers = [{ provider: 'email' }, { provider: 'google' }];

const facilities = [
  {
    facility: 'Wifi',
    icon: 'Wifi',
  },
  {
    facility: 'Workspace',
    icon: 'MonitorSpeaker',
  },
  {
    facility: 'Eating utensils',
    icon: 'Utensils',
  },
  {
    facility: 'Kitchen',
    icon: 'CookingPot',
  },
  {
    facility: 'Fridge',
    icon: 'Fridgerator',
  },
  {
    facility: 'Microwave',
    icon: 'Microwave',
  },
  {
    facility: 'Pool',
    icon: 'Waves',
  },
  {
    facility: 'Gym',
    icon: 'Dumbbell',
  },
  {
    facility: 'Parking area',
    icon: 'CarFront',
  },
  {
    facility: 'TV',
    icon: 'Tv',
  },
  {
    facility: 'Room services',
    icon: 'Bed',
  },
  {
    facility: 'Washing machine',
    icon: 'WashingMachine',
  },
  {
    facility: 'Air Conditioner',
    icon: 'AirVent',
  },
  {
    facility: 'Bathtub',
    icon: 'Bath',
  },
  {
    facility: 'Hot water',
    icon: 'ShowerHead',
  },
  {
    facility: 'Drinking water',
    icon: 'GlassWater',
  },
  {
    facility: 'Outdoor area',
    icon: 'Trees',
  },
  {
    facility: 'CCTV camera',
    icon: 'Cctv',
  },
  {
    facility: 'Safebox',
    icon: 'Vault',
  },
];

const categories = [
  { category: 'Apartment' },
  { category: 'Villa' },
  { category: 'House' },
  { category: 'Penthouse' },
  { category: 'Cottage' },
  { category: 'Cabin' },
  { category: 'Resort' },
  { category: 'Penthouse' },
  { category: 'Loft' },
  { category: 'Hotel' },
];

const payment_types = [
  {
    type: 'manual',
  },
  {
    type: 'automatic',
  },
];

const booking_status = [
  {
    status: 'Waiting for payment',
  },
  {
    status: 'Waiting for confirmation',
  },
  { status: 'Booking confirmed' },
  { status: 'Booking cancelled' },
];

const users = [
  {
    email: 'wulan@test.com',
    display_name: 'wlntsbt',
    is_verified: true,
    password: 'wulan123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'dito@test.com',
    display_name: 'dito',
    is_verified: true,
    password: 'dito123',
    rolesId: 2,
    providersId: 1,
  },
];

const tenant_profile = [
  {
    display_name: 'Lunar Motels',
  },
  {
    display_name: 'The 101',
  },
];

const listing = [
  {
    title: 'Apartment for rent in Gading Serpong, Tangerang',
    description:
      'in the heart of Midtown of Gading Serpong ! Situated just across from a bustling shopping mall, our small yet charming space offers a unique and intimate stay experience. \n Despite its size, our space is creatively utilized, maximizing every inch to provide you with all the comforts you need for a pleasant stay.\nGuest access \nYou only need to cross from Summarecon mall Serpong. (5 minute walk). Please enter Mtown residence on your G Maps',
    address:
      'Jl. Gading Serpong Boulevard Blok M5 No.3, Pakulonan Bar., Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810',
    country: 'Indonesia',
    city: 'Tangerang Regency',
    location_coordinate: { lat: -6.242484524157822, lng: 106.63180806755862 },
    contact_person: '039285322',
    tenantsId: 'sdjasf2',
    categoriesId: 1,
  },
  {
    title: 'The Ritz-Carlton Hotel, Kuala Lumpur',
    description:
      'The Ritz-Carlton, Kuala Lumpur is located in area / city Bukit Bintang. 24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you. WiFi is available within public areas of the property to help you to stay connected with family and friends.',
    address:
      '168, Jln Imbi, Bukit Bintang, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.147198125888679, lng: 101.7154356693523 },
    contact_person: '039284829',
    tenantsId: 'sdjasf2',
    categoriesId: 10,
  },
];

const room_types = [
  [
    {
      capacity: 2,
      bed_details: '1 Queen Bed',
      price: 385000,
    },
  ],
  [
    {
      name: 'Deluxe Twin Room',
      stock: 3,
      capacity: 2,
      bed_details: '2 Single Beds',
      price: 420000,
      has_breakfast_option: true,
      breakfast_price: 240000,
    },
    {
      name: 'Grand Deluxe King Room',
      stock: 3,
      capacity: 2,
      bed_details: '2 Single Beds',
      price: 780000,
      has_breakfast_option: true,
      breakfast_price: 240000,
    },
    {
      name: '3BR Residence',
      stock: 1,
      capacity: 6,
      bed_details: '1 Queen Bed, 1 King Bed, 2 Single Beds',
      price: 2450000,
      has_breakfast_option: true,
    },
  ],
];

const listing_facilities = [
  [
    {
      facilitiesId_list: [
        1, 7, 8, 18, 17, 9, 4, 5, 3, 10, 2, 19, 15, 11, 14, 13, 16,
      ],
    },
  ],
  [
    {
      facilitiesId_list: [7, 8, 18, 17, 9],
    },
  ],
];

const room_facilities = [
  {
    room_typesId: 2,
    facilitiesId_list: [1, 2, 19, 15, 11, 13, 16],
  },
  {
    room_typesId: 3,
    facilitiesId_list: [1, 2, 19, 15, 11, 10, 5, 13, 16],
  },
  {
    room_typesId: 4,
    facilitiesId_list: [1, 2, 19, 15, 11, 10, 14, 13, 16, 4, 3, 5],
  },
];

const listing_images = [
  [
    {
      image_url: process.env.SERVER_URL + '/src/image/room2_1.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/room2_2.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/room2_3.webp',
    },
  ],
  [
    {
      image_url: process.env.SERVER_URL + '/src/image/hotel_1_1.webp',
      listingsId: 1,
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/hotel_1_2.webp',
      listingsId: 1,
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/hotel_1_3.webp',
      listingsId: 1,
    },
  ],
];

const room_images = [
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_1.webp',
    room_typesId: 2,
  },
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_2.webp',
    room_typesId: 3,
  },
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_3.webp',
    room_typesId: 4,
  },
];

const bookings = [
  {
    room_typesId: 4,
    start_date: new Date('2024-06-13'),
    end_date: new Date('2024-06-17'),
    num_of_guests: 5,
    expired_at: new Date(Date.now() + 1 * (60 * 60 * 1000)),
    payment_typesId: 2,
    booking_statusId: 3,
    total_price: 2450000,
  },
  {
    room_typesId: 2,
    start_date: new Date('2024-06-14'),
    end_date: new Date('2024-06-17'),
    num_of_guests: 2,
    expired_at: new Date(Date.now() + 1 * (60 * 60 * 1000)),
    payment_typesId: 2,
    booking_statusId: 3,
    total_price: 420000,
  },
];

const seasonal_prices = [
  {
    price: 400000,
    start_date: new Date('2024-06-14'),
    end_date: new Date('2024-06-16'),
    room_typesId: 1,
  },
  {
    price: 350000,
    start_date: new Date('2024-06-17'),
    end_date: new Date('2024-06-20'),
    room_typesId: 2,
  },
  {
    price: 240000,
    start_date: new Date('2024-07-10'),
    end_date: new Date('2024-07-15'),
    room_typesId: 1,
  },
];

const nonavailable = [
  {
    room_typesId: 3,
    start_date: new Date('2024-06-12'),
    end_date: new Date('2024-06-20'),
  },
  {
    room_typesId: 1,
    start_date: new Date('2024-06-24'),
    end_date: new Date('2024-06-30'),
  },
];

async function main() {
  for (let role of roles) {
    await prisma.roles.create({
      data: role,
    });
  }

  for (let provider of providers) {
    await prisma.providers.create({
      data: provider,
    });
  }

  for (let category of categories) {
    await prisma.categories.create({
      data: category,
    });
  }

  for (let status of booking_status) {
    await prisma.booking_status.create({
      data: status,
    });
  }

  for (let facility of facilities) {
    await prisma.facilities.create({
      data: facility,
    });
  }

  for (let payment_type of payment_types) {
    await prisma.payment_types.create({
      data: payment_type,
    });
  }

  const userInfo = [];
  for (let user of users) {
    let { password } = user;
    password = await bcrypt.hash(password, saltRounds);
    user.password = password;
    await prisma.users.create({
      data: user,
    });
    const data = await prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });
    userInfo.push(data);
  }

  const tenantInfo = [];

  for (let i = 0; i < userInfo.length; i++) {
    const newTenant = await prisma.tenants.create({
      data: {
        usersId: userInfo[i].uid,
        display_name: tenant_profile[i].display_name,
      },
    });

    tenantInfo.push(newTenant);

    listing[i].tenantsId = newTenant.id;

    const newListing = await prisma.listings.create({
      data: listing[i],
    });

    const slug = `${newListing.title} ${newListing.id}`
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-');

    await prisma.listings.update({
      where: {
        id: newListing.id,
      },
      data: {
        slug,
      },
    });

    for (let x of room_types[i]) {
      const new_room_type = await prisma.room_types.create({
        data: {
          ...x,
          listingsId: newListing.id,
        },
      });
    }

    for (let x of listing_facilities[i]) {
      for (let list of x.facilitiesId_list) {
        await prisma.listing_facilities.create({
          data: {
            listingsId: newListing.id,
            facilitiesId: list,
          },
        });
      }
    }

    for (let x of listing_images[i]) {
      await prisma.listing_images.create({
        data: {
          image_url: x.image_url,
          listingsId: newListing.id,
        },
      });
    }
  }

  for (let room_facility of room_facilities) {
    for (let list of room_facility.facilitiesId_list) {
      await prisma.room_facilities.create({
        data: {
          room_typesId: room_facility.room_typesId,
          facilitiesId: list,
        },
      });
    }
  }

  for (let room_image of room_images) {
    await prisma.room_images.create({
      data: room_image,
    });
  }

  for (let book of bookings) {
    await prisma.bookings.create({
      data: {
        ...book,
        usersId: userInfo[1].uid,
      },
    });
  }

  for (let nonav of nonavailable) {
    await prisma.nonavailability.create({
      data: nonav,
    });
  }

  for (let seasonal_price of seasonal_prices) {
    await prisma.seasonal_prices.create({
      data: seasonal_price,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
