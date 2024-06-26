import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds = 10;

const roles = [{ role: 'user' }, { role: 'tenant' }];

const providers = [{ provider: 'email' }, { provider: 'google' }];

const facilities = [
  { facility: 'Wifi', icon: 'Wifi' },
  { facility: 'Workspace', icon: 'MonitorSpeaker' },
  { facility: 'Eating utensils', icon: 'Utensils' },
  { facility: 'Kitchen', icon: 'CookingPot' },
  { facility: 'Fridge', icon: 'Fridgerator' },
  { facility: 'Microwave', icon: 'Microwave' },
  { facility: 'Pool', icon: 'Waves' },
  { facility: 'Gym', icon: 'Dumbbell' },
  { facility: 'Parking area', icon: 'CarFront' },
  { facility: 'TV', icon: 'Tv' },
  { facility: 'Room services', icon: 'Bed' },
  { facility: 'Washing machine', icon: 'WashingMachine' },
  { facility: 'Air Conditioner', icon: 'AirVent' },
  { facility: 'Bathtub', icon: 'Bath' },
  { facility: 'Hot water', icon: 'ShowerHead' },
  { facility: 'Drinking water', icon: 'GlassWater' },
  { facility: 'Outdoor area', icon: 'Trees' },
  { facility: 'CCTV camera', icon: 'Cctv' },
  { facility: 'Safebox', icon: 'Vault' },
];

const categories = [
  { category: 'Apartment' },
  { category: 'Villa' },
  { category: 'House' },
  { category: 'Penthouse' },
  { category: 'Cottage' },
  { category: 'Cabin' },
  { category: 'Resort' },
  { category: 'RV' },
  { category: 'Loft' },
  { category: 'Hotel' },
];

const payment_types = [{ type: 'manual' }, { type: 'automatic' }];

const booking_status = [
  { status: 'Waiting for payment' },
  { status: 'Waiting for confirmation' },
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
  {
    email: 'made@test.com',
    display_name: 'made_',
    is_verified: true,
    password: 'made123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'mahendra@test.com',
    display_name: 'MahendrA',
    is_verified: true,
    password: 'mahendra123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'isabel@test.com',
    display_name: 'isabelMarant',
    is_verified: true,
    password: 'isabel123',
    rolesId: 2,
    providersId: 1,
  },
];

let tenant_profile = [
  { display_name: 'Lunar Motels' },
  { display_name: 'The 101' },
  { display_name: 'Kampoeng Saya' },
  { display_name: 'Mahendra Stays' },
  { display_name: 'Kozystay' },
];

let listing = [
  {
    title: 'Apartment for rent in Gading Serpong, Tangerang',
    description: 'in the heart of Midtown of Gading Serpong! ...',
    address: 'Jl. Gading Serpong Boulevard Blok M5 No.3, ...',
    country: 'Indonesia',
    city: 'Tangerang Regency',
    location_coordinate: { lat: -6.242484524157822, lng: 106.63180806755862 },
    contact_person: '039285322',
    categoriesId: 1,
    tenant_name: 'Lunar Motels',
  },
  {
    title: 'The Ritz-Carlton Hotel, Kuala Lumpur',
    description:
      'The Ritz-Carlton, Kuala Lumpur is located in area / city Bukit Bintang ...',
    address: '168, Jln Imbi, Bukit Bintang, ...',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.147198125888679, lng: 101.7154356693523 },
    contact_person: '039284829',
    categoriesId: 10,
    tenant_name: 'The 101',
  },
  {
    title: 'Canggu Room - Kampoeng Saya Villa',
    description:
      "Welcome to Kampoeng Saya Villa, a haven that captures the essence of a traditional Balinese village in Bali. Immerse yourself in the rich cultural heritage and tranquil ambience that this unique villa offers. \nSet amidst lush tropical surroundings, Kampoeng Saya Villa is a picturesque retreat that comprises seven charming wooden houses, each featuring its own attached bathroom for added privacy and comfort. The traditional architecture and intricate woodwork showcase the authentic Balinese craftsmanship, creating a warm and inviting atmosphere. \nStep inside your spacious and beautifully designed room, where you'll find a cozy sanctuary adorned with local décor and furnishings. Relax in your comfortable bed, surrounded by traditional elements that reflect the cultural heritage of Bali.",
    address: 'Badung, Indonesia',
    country: 'Bali',
    city: 'Indonesia',
    location_coordinate: { lat: -8.689152, lng: 115.169093 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Kampoeng Saya',
  },
  {
    title: 'Sanur Room - Kampoeng Saya Villa',
    description:
      "Welcome to Kampoeng Saya Villa, a haven that captures the essence of a traditional Balinese village in Bali. Immerse yourself in the rich cultural heritage and tranquil ambience that this unique villa offers. \nSet amidst lush tropical surroundings, Kampoeng Saya Villa is a picturesque retreat that comprises seven charming wooden houses, each featuring its own attached bathroom for added privacy and comfort. The traditional architecture and intricate woodwork showcase the authentic Balinese craftsmanship, creating a warm and inviting atmosphere. \nStep inside your spacious and beautifully designed room, where you'll find a cozy sanctuary adorned with local décor and furnishings. Relax in your comfortable bed, surrounded by traditional elements that reflect the cultural heritage of Bali.",
    address: 'Badung, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.689152, lng: 115.169093 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Kampoeng Saya',
  },
  {
    title: 'Jungle Eco Resort, Lumbung Queen Kusfarm Bali',
    description:
      'Kusfarm Bali is an Eco Resort with 16,000+ m2, established with amazing hydroponic garden and perfectly located near the peaceful Ricefield, surrounded with natural tropical forest, and crossed by the calming river of Bajera Selemadeg, Tabanan. We also provide so many activities such as cycling through rice fields, yoga, meditation, green house, fruit wine making, other Bali destination tours, etc. Please contact us for details. This Eco Resort has The Most Complete Nature Elements in Bali.',
    address: 'Kecamatan Selemadeg, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.49651, lng: 115.02598 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Kampoeng Saya',
  },
  {
    title: 'Ceylon Villas 3 - 1BR Villa',
    description:
      "The recently built Ceylon Villas offer contemporary and stylish private villa accomodation. Situated amongst beautiful green rice terraces, 5 minutes from Ubud centre. The perfect distance out of town to find peace yet still access all of Ubud's amenities. \nNatural earthy tones, greenery, bespoke furnishings, concrete, wood and floor-to-ceiling glass to finish the space perfectly. \nFeaturing infinity pool, outstanding elevated views, ensuite bathrooms, luxurious bedding, desk space & fast WIFI.",
    address: 'Ubud, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.49798, lng: 115.27966 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Kampoeng Saya',
  },
  {
    title: 'Rice Field Side in Berawa',
    description:
      'Bersantai di tempat liburan unik dan tenteram ini a Guesthouse with pool and rice field side in Berawa - Canggu which is only 400 meters to Finns Beach Club and Atlas. Easy to get cafe and restauran by walking distance.',
    address: 'Kecamatan Kuta Utara, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.66338, lng: 115.14802 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Mahendra Stays',
  },
  {
    title: 'The Local Entik-Entikan',
    description:
      'Experience tropical Balinese modern living at our place feel the ambience of rainforest and natural lifestyles and enjoying the outdoor bathub surrounded by the plantation to relaxing your visions , and you can enjoy our nice waterfall in our vilage with natural pool,10 minutes to penglipuran tradional vilage,25 minutes to kintamani,walking distance to goa raja waterfall,and you can do your own vilage tour to see the originaly people vilage live.',
    address: 'Bangli, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.4339, lng: 115.3742 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Mahendra Stays',
  },
  {
    title: 'Belle Asana',
    description:
      'Set 2.5 km from Batu Bolong Beach, Belle Asana - Long Stay Offer Available offers accommodation with an outdoor swimming pool, a garden and a 24-hour front desk for your convenience. The air-conditioned units feature a living room with a flat-screen TV, a kitchen with a microwave and a fridge, a safety deposit box, and a private bathroom with a hairdryer and free toiletries. A balcony with pool views is offered in every unit.',
    address: 'Kecamatan Kuta Utara, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.64627, lng: 115.14775 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Mahendra Stays',
  },
  {
    title: 'Dasha by Kozystay | Panoramic View in Jimbaran',
    description:
      'Welcome to our soft opening modern 6-bedroom villa in Jimbaran! Bali. Enjoy luxurious living with a private pool. Each bedroom offers comfort and privacy with en-suite bathrooms. Relax in the lush tropical surroundings. Experience the epitome of luxury living in paradise.',
    address: 'Kecamatan Kuta Selatan, Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    location_coordinate: { lat: -8.8068, lng: 115.1826 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'Kozystay',
  },
];

let room_types = [
  [{ capacity: 2, bed_details: '1 Queen Bed', price: 385000 }],
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
  [
    {
      capacity: 2,
      bed_details: '2 Double Beds',
      price: 350000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '2 Double Beds',
      price: 335000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '1 Queen Bed',
      price: 840000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '1 King Bed',
      price: 1630000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '1 Queen Bed',
      price: 743000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '1 Queen Bed',
      price: 500000,
    },
  ],
  [
    {
      capacity: 2,
      bed_details: '1 Queen Bed',
      price: 884000,
      stock: 3,
    },
  ],
  [
    {
      capacity: 12,
      bed_details: '6 Queen Beds',
      price: 9825000,
      stock: 1,
    },
  ],
];

const listing_facilities = [
  {
    facilitiesId_list: [
      1, 7, 8, 18, 17, 9, 4, 5, 3, 10, 2, 19, 15, 11, 14, 13, 16,
    ],
  },
  { facilitiesId_list: [7, 8, 18, 17, 9] },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 4, 5, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 4, 5, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
];

const room_facilities = [
  { room_typesId: 2, facilitiesId_list: [1, 2, 19, 15, 11, 13, 16] },
  { room_typesId: 3, facilitiesId_list: [1, 2, 19, 15, 11, 10, 5, 13, 16] },
  {
    room_typesId: 4,
    facilitiesId_list: [1, 2, 19, 15, 11, 10, 14, 13, 16, 4, 3, 5],
  },
];

const listing_images = [
  [
    { image_url: process.env.SERVER_URL + '/src/image/room2_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/room2_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/room2_3.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/hotel_1_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/hotel_1_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/hotel_1_3.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/canggu_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/canggu_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/canggu_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/canggu_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/canggu_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/sanur_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/sanur_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/sanur_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/sanur_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/sanur_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/jungle_eco_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/jungle_eco_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/jungle_eco_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/jungle_eco_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/jungle_eco_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/ceylon_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ceylon_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ceylon_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ceylon_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ceylon_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/ricefield_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ricefield_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ricefield_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ricefield_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ricefield_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/thelocal_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thelocal_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thelocal_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thelocal_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thelocal_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/asana_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asana_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asana_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asana_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asana_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/dasha_1.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_5.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_6.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dasha_7.webp' },
  ],
];

const room_images = [
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_1.webp',
    room_name: 'Deluxe Twin Room',
  },
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_2.webp',
    room_name: 'Grand Deluxe King Room',
  },
  {
    image_url: process.env.SERVER_URL + '/src/image/hotel_1_type_3.webp',
    room_name: '3BR Residence',
  },
];

let bookings = [
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
    start_date: new Date('2024-07-12'),
    end_date: new Date('2024-07-20'),
  },
  {
    room_typesId: 1,
    start_date: new Date('2024-07-24'),
    end_date: new Date('2024-07-30'),
  },
];

async function main() {
  await prisma.roles.createMany({ data: roles });
  await prisma.providers.createMany({ data: providers });
  await prisma.facilities.createMany({ data: facilities });
  await prisma.categories.createMany({ data: categories });
  await prisma.payment_types.createMany({ data: payment_types });
  await prisma.booking_status.createMany({ data: booking_status });

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, saltRounds),
    })),
  );

  await prisma.users.createMany({
    data: hashedUsers,
  });

  const createdUsers = await prisma.users.findMany();
  console.log(createdUsers);

  tenant_profile = await Promise.all(
    tenant_profile.map(async (tenant, index) => ({
      ...tenant,
      usersId: createdUsers[index].uid,
    })),
  );

  await prisma.tenants.createMany({
    data: tenant_profile,
  });

  const createdTenantProfiles = await prisma.tenants.findMany();

  listing = await Promise.all(
    listing.map(async (item, index) => ({
      title: item.title,
      description: item.description,
      address: item.address,
      country: item.country,
      city: item.city,
      location_coordinate: item.location_coordinate,
      contact_person: item.contact_person,
      categoriesId: item.categoriesId,
      tenantsId: createdTenantProfiles.find(
        (tenant) => tenant.display_name == item.tenant_name,
      ).id,
    })),
  );

  await prisma.listings.createMany({ data: listing });

  const createdListings = await prisma.listings.findMany();

  console.log('Tenant Profile', createdTenantProfiles);

  for (let listing of createdListings) {
    await prisma.listings.update({
      where: {
        id: listing.id,
      },
      data: {
        slug: `${listing.title} ${listing.id}`
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, '-'),
      },
    });
  }

  console.log(createdListings);

  await Promise.all(
    room_types.map(async (types, index) => {
      return await prisma.room_types.createMany({
        data: types.map((type) => ({
          ...type,
          listingsId: createdListings[index].id,
        })),
      });
    }),
  );

  await Promise.all(
    listing_facilities.map(async (facility, index) => {
      await prisma.listing_facilities.createMany({
        data: facility.facilitiesId_list.map((facilityId) => ({
          listingsId: createdListings[index].id,
          facilitiesId: facilityId,
        })),
      });
    }),
  );

  await Promise.all(
    room_facilities.map(async (facility) => {
      await prisma.room_facilities.createMany({
        data: facility.facilitiesId_list.map((facilityId) => ({
          room_typesId: facility.room_typesId,
          facilitiesId: facilityId,
        })),
      });
    }),
  );

  await Promise.all(
    listing_images.map(async (images, index) => {
      await prisma.listing_images.createMany({
        data: images.map((image) => ({
          listingsId: createdListings[index].id,
          ...image,
        })),
      });
    }),
  );

  const createdRoomTypes = await prisma.room_types.findMany();

  for (let image of room_images) {
    await prisma.room_images.create({
      data: {
        image_url: image.image_url,
        room_typesId: createdRoomTypes.find(
          (room) => room.name == image.room_name,
        ).id,
      },
    });
  }

  bookings = await Promise.all(
    bookings.map(async (item, index) => ({
      ...item,
      usersId: createdUsers[index].uid,
    })),
  );

  console.log(bookings);

  await prisma.bookings.createMany({ data: bookings });

  await prisma.seasonal_prices.createMany({ data: seasonal_prices });

  await prisma.nonavailability.createMany({ data: nonavailable });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
