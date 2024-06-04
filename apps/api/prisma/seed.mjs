import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    status: 'Waiting for confirmation',
    status: 'Booking confirmed',
    status: 'Booking cancelled',
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
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
