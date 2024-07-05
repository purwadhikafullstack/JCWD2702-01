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
  {
    email: 'dhira@test.com',
    display_name: 'dhira',
    is_verified: true,
    password: 'dhira123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'christiana@test.com',
    display_name: 'christiana',
    is_verified: true,
    password: 'christiana123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'esther@test.com',
    display_name: 'esther',
    is_verified: true,
    password: 'esther123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'zanna@test.com',
    display_name: 'zanna',
    is_verified: true,
    password: 'zanna123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'compass@test.com',
    display_name: 'compass',
    is_verified: true,
    password: 'compass123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'eika@test.com',
    display_name: 'eika',
    is_verified: true,
    password: 'eika123',
    rolesId: 2,
    providersId: 1,
  },
  {
    email: 'harumi@test.com',
    display_name: 'harumi',
    is_verified: true,
    password: 'harumi123',
    rolesId: 2,
    providersId: 1,
  },
];

let tenant_profile = [
  { display_name: 'Lunar Motels', email: 'wulan@test.com' },
  { display_name: 'The 101', email: 'dito@test.com' },
  { display_name: 'Kampoeng Saya', email: 'made@test.com' },
  { display_name: 'Mahendra Stays', email: 'mahendra@test.com' },
  { display_name: 'Kozystay', email: 'isabel@test.com' },
  { display_name: 'Adhiraa', email: 'dhira@test.com' },
  { display_name: 'Jakarta Stays', email: 'christiana@test.com' },
  { display_name: 'EstherLiving', email: 'esther@test.com' },
  { display_name: 'RentWithZanna', email: 'zanna@test.com' },
  { display_name: 'Compass Stay', email: 'compass@test.com' },
  { display_name: 'HomeByEika', email: 'eika@test.com' },
  { display_name: 'HomeRumi', email: 'harumi@test.com' },
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
  {
    title: 'Luxury 4-Bedroom West Jakarta House', // Adhiraa - 1
    description:
      'Bersantai bersama seluruh keluarga di tempat menginap yang damai ini. Vila Rumah 4 Kamar Tidur Mewah dan Modern yang terinspirasi 330 meter persegi (3552 kaki persegi) yang terletak di Jakarta Barat. Ruang tamu rencana terbuka, ruang makan, dapur lengkap, dan kolam renang yang menyediakan ruang yang cukup untuk keluarga berkumpul. Semua kamar tidur memiliki kamar mandi dalam. Kamar tidur utama lengkap dengan bathtub. Mesin cuci disediakan di dalam rumah. Kami menyewakan rumah bebas asap rokok/vaping, dan dilarang berpesta',
    address: 'Kecamatan Kembangan, Daerah Khusus Ibukota Jakarta, Indonesia',
    country: 'Indonesia',
    city: 'Jakarta Barat',
    location_coordinate: { lat: -6.192333581766335, lng: 106.73804237706267 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'Adhiraa',
  },
  {
    title: 'The WritersRoom, Capitol Suites - Menteng -1km Gambir', // Adhiraa - 2
    description:
      'You can borrow and use everything you want inside this room and you can enjoy any facility of the apartment.',
    address: 'Kecamatan Senen, Daerah Khusus Ibukota Jakarta, Indonesia',
    country: 'Indonesia',
    city: 'Jakarta Pusat',
    location_coordinate: { lat: -6.187103207370401, lng: 106.84526747427762 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'Adhiraa',
  },
  {
    title: 'Sea View Gold Coast #21.2', // Adhiraa - 3
    description:
      'Apartemen Gold Coast Atlantic Tower berlokasi di Pantai Indah Kapuk (PIK), Jakarta Utara. Apartemen Studio Mewah Baru dengan dekorasi modern, nyaman, nyaman dengan pemandangan laut yang indah. Terletak di lokasi yang strategis, 5 menit dari PIK Avenue Mall, Restoran/ Kafe, pasar lokal. Anda dapat menemukan banyak pilihan makanan dan hiburan menarik di sekitar area ini. Hanya 15 menit dari bandara.',
    address: 'Kecamatan Penjaringan, Daerah Khusus Ibukota Jakarta, Indonesia',
    country: 'Indonesia',
    city: 'Jakarta Utara',
    location_coordinate: { lat: -6.101697374436291, lng: 106.73815849510163 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'Adhiraa',
  },
  {
    title: 'Rumah Miring by CGartspace - Pondok Indah Jakarta', // Jakarta Stays - 1
    description:
      'The place is close to Shopping malls, public transport with easy access to food and entertainment. great ambiance and outdoors space, its a contemporary home with lots of arts, designed by famous architect of Budi Pradono. Its a dream home, feel like a resort. Next to this space is my art gallery - CGartspace. My place is good for couples, solo adventurers, group of friends, family with teen kids. and business traveler, people who love sunlight, nature, arts, architectural and photography.',
    address: 'Kebayoran Lama, Daerah Khusus Ibukota Jakarta, Indonesia',
    country: 'Indonesia',
    city: 'Jakarta Selatan',
    location_coordinate: { lat: -6.253676589899027, lng: 106.77883299603627 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'Jakarta Stays',
  },
  {
    title: 'Casa De Victoria by Jakarta Stays', // Jakarta Stays - 2
    description:
      'Bring the whole family to this great place with lots of room for fun. Casa De Victoria by Jakarta Stays',
    address: 'Pasar Minggu, Daerah Khusus Ibukota Jakarta, Indonesia',
    country: 'Indonesia',
    city: 'Jakarta Selatan',
    location_coordinate: { lat: -6.290040903426821, lng: 106.83916624755155 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'Jakarta Stays',
  },
  {
    title: 'Gluck Star, Sleeping with sky view', // EstherLiving - 1
    description:
      'Welcome to Gluck Star! Apart of Glucstaycation and it is located in the same area as GLuck Room and Gluck Roof, GluckLoft. Photo/videoshoot using professional photographer / equipment for prewedding, commercial product and maternity/family will be extra charged.',
    address: 'Bandung, Jawa Barat, Indonesia',
    country: 'Indonesia',
    city: 'Bandung',
    location_coordinate: { lat: -6.862237098172499, lng: 107.62321722438236 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Casa Lembang', // EstherLiving - 2
    description:
      'Casa lembang 1 comforts you with our attic and rooftop where families can enjoy star gazing at nights, scenic mountain view during the day and cool weather (down to 17c) in the mornings. The perfect place for a quiet getaway with your friends, spouse and family. We welcome you with WiFi, Netflix and smart TV to chill and unwind.',
    address: 'Lembang, Bandung Barat, Jawa Barat, Indonesia',
    country: 'Indonesia',
    city: 'Bandung',
    location_coordinate: { lat: -6.8199352817937795, lng: 107.63313130265526 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Vila Serena', // EstherLiving - 3
    description:
      'Kick back and relax in this new cabin with spacious yard, walking distance to Kampung Daun. Pet free, absolutely no smoking inside the cabin',
    address: 'Kecamatan Parongpong, Bandung Barat, Jawa Barat, Indonesia',
    country: 'Indonesia',
    city: 'Bandung',
    location_coordinate: { lat: -6.817369294103219, lng: 107.58942124693057 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Twelve Stones', // EstherLiving - 4
    description:
      'Have fun with the whole family at this stylish place. Near Ikea and Wahoo Kota Baru Parahyangan Surrounding beautiful mountain and lake view Many kind of culinary all day You can lay back inside the warm water pool, have bbq times with Friend and Family , Watching Wifi or just sleep for whole day.',
    address: 'West Bandung Regency, Jawa Barat, Indonesia',
    country: 'Indonesia',
    city: 'Bandung',
    location_coordinate: { lat: -6.867998375991984, lng: 107.4580311070145 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Winds Cabin', // RentWithZanna - 1
    description:
      'The place is surrounded by many plants with a small garden in front of it with fresh air and calm surroundings.',
    address:
      'Kp Situhiang, RT.3/RW.16, Alamendah, Kec. Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    country: 'Indonesia',
    city: 'Bandung',
    location_coordinate: { lat: -7.12584343579809, lng: 107.42663404108663 },
    contact_person: '039284829',
    categoriesId: 6,
    tenant_name: 'RentWithZanna',
  },
  {
    title: 'Yanaka Sow Concept Twin', // Compass Stay - 1
    description:
      'YANAKA SOW is a perfect place to enjoy walking Yanasen, for the sightseeing, and for a workation. 7-min walk from Nippori Station on the JR Line, 7-min walk from Sendagi Station on the Tokyo Metro Chiyoda Line, and 5-min walk to Yanaka Shopping Street. This hotel is a space that you can use like your second home. The town guidance staff called YANAKA DIGGER, who connects the town and guests, will help even first-time visitors can naturally blend into the city and have a wonderful time here.',
    address: '5 Chome-2-14 Yanaka, Taito City, Tokyo 110-0001, Japan',
    country: 'Japan',
    city: 'Tokyo',
    location_coordinate: { lat: 35.72499422236392, lng: 139.76793756582543 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'Compass Stay',
  },
  {
    title: 'Charming Home Near Asakusa/SkyTree, Free Bicycles', // HomeByEika - 1
    description:
      'My house is close to Asakusa area. It locates in a residential neighborhood. 8-10min walk to the nearest station, Hikifune & Keisei Hikifune. Then 2 min to Tokyo Sky Tree by train, 5 min to Asakusa, and directly to Otemachi, Shibuya... It is easy to access from Haneda & Narita Airports as well. There is a traditional shopping street out of the door. It is famous for its ninety-year-history. You can find Japanese food and bakery stores and lovely cats there. Free Hi-speed Wi-Fi, Free Netflix.',
    address: '3-chōme-42 Kyōjima, Sumida City, Tokyo 131-0046, Japan',
    country: 'Japan',
    city: 'Tokyo',
    location_coordinate: { lat: 35.71342283686191, lng: 139.8229214699541 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'HomeByEika',
  },
  {
    title: 'haneda airport directly Skytree 3min walk suitroom', // HomeByEika - 2
    description:
      '3 minutes away from Oshiage station and 2 minutes away from the sky tree. The night view is beautiful and shopping is convenient. You can directly reach Narita Airport or Haneda Airport.',
    address:
      'Japan, 〒130-0002 Tokyo, Sumida City, Narihira, 1 Chome-19, G2-01.東京ソラマチ',
    country: 'Japan',
    city: 'Tokyo',
    location_coordinate: { lat: 35.70971943491281, lng: 139.81018766778328 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'HomeByEika',
  },
  {
    title: 'Peaceful Riverside View, Asakusa', // HomeRumi - 1
    description:
      'Ideally located along the Sumida River, we offer you a little oasis amid the hustle and bustle of Tokyo. I also fully respect your privacy, and your room will be perfect for relaxing, giving you time to slow down. My place has the perfect location for your holiday, near many attractions and fun spots, including the Asakusa area, Akihabara area and the Ueno area. You can easily go to Ginza area by subway, or the Tokyo area by bus. I mean, it is centrally located, a great launching point to explore Tokyo. It is also a 10-second walk distance to the police station, creating a safe and secure environment. The views are also awesome - you can enjoy the Sumida Riverside view, beautiful Tokyo Skytree view with the wide sky in the middle of Tokyo. Especially the end of July Great Fireworks is fantastic! If you have a chance, please come and enjoy! There are also many restaurants around, providing you many choices to eat out, or you can cook with the Japanese stuff, using your own kitchen!',
    address: '2-chōme-18-11 Kuramae, Taito City, Tokyo 111-0051, Japan',
    country: 'Japan',
    city: 'Tokyo',
    location_coordinate: { lat: 35.70470109774278, lng: 139.79400362735956 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'HomeRumi',
  },
  {
    title: '201 Asakadai, JR KitaAsaka; Small Lodging', // HomeRumi - 2
    description:
      'A studio apartment for 1 week or longer stay with furniture and daily goods. 2 people can stay together though originally one-person household. The 2 nearest stations are Asakadai of Tobu-tojo Line and JR Kita-asaka. Located in the suburbs within commuting distance to central Tokyo, you have to research a complex train network and walk extra, expected an extra 20-30 min of travel time per day compared to a city hotel. You can save on accommodation costs in return.',
    address: '4-chōme-2 Asashigaoka, Asaka, Saitama 351-0035, Japan',
    country: 'Japan',
    city: 'Saitama',
    location_coordinate: { lat: 35.82284414774133, lng: 139.58559383397312 },
    contact_person: '039284829',
    categoriesId: 3,
    tenant_name: 'HomeRumi',
  },
  {
    title: 'The BirdsEye View facing KLCC with Gorgeous pools', // EstherLiving - 5
    description:
      'New construction, newly decorated, perfect KL city views, and gorgeous pools and all located in central KL. The Birdeye View has one bedroom, a living room, a full bath, and a full kitchen with an oven. There is 1-queen bed in the bedroom and a sofa sleeper and a comfortable deluxe air mattress in the living room. You will not be disappointed with this place. :-) Recommended for 4 people, max can sleep 5.',
    address:
      'Jln Pudu, Bukit Bintang, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.139396458258491, lng: 101.7086921086215 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Alla Moda #33A Ceylonz Suites KL', // EstherLiving - 6
    description:
      'Enjoy a stylish experience at this centrally-located place. Walking distance to Masjid Jamek LRT interconnecting stations, Bukit Bintang, Petaling Street, Central Market, Alor Street Food, and many many more attractions. Greenery at this peaceful and wonderful view of KL City. Superb 5-star facilities at rooftop with best view of KL skyscrapers',
    address:
      'Jln Pudu, Bukit Bintang, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.148421849725002, lng: 101.70345249624167 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'New! NIDOZ 5star Suite! GalaxyPool!4BR', // EstherLiving - 7
    description:
      'he Luxury condo is beautiful, wonderful city view, located in central of whole Kuala Lumpur. This is brand new building, is your best choice - 4 bedroom with 3 double bed, 1 single & 1 sofa bed. We will also provide you with one-off items. Includes - Toothbrush - Toothpaste - Soap - Shampoo - Shower gel - Towel, equipped with - Free WiFi - TV - Kitchen - Shower - Hairdryer - Iron and ironing board - Toilet - Bathroom - Kitchenette Freezer - Electric Kettle - Oven - Secure Accessible Parking - BBQ Area - Sky Deck - Outdoor Swimming Pool - Gym Check-in time 15:00, Check-out time 11:00 Why choose us? There will be professional cleaning and disinfection before your stay, and bedding including sheets, pillows and quilts will be provided. Will be replaced before checking in. We will also provide you with disposable supplies. Including toothbrush, toothpaste, soap, shampoo, shower gel and towel。 Our listing will also prepare kitchenware, tableware, refrigerator, oven, electric kettle, hair dryer, TV for you. #New high-speed wireless internet is completely free',
    address:
      'Persiaran Ikhlas, Bandar Tun Razak, Cheras, 56000 Kuala Lumpur, Wilayah Persekutuan, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.0885744081289257, lng: 101.71345612763648 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'FamilyFunSuiteKLCCview@TrionKL', // EstherLiving - 8
    description:
      'This is a place where your kids can enjoy themselves and not forgetting the payor --> Parents!! 🥳. We have a climbing board for kids and a balcony for the lovely parents to chill at. You can also enjoy watching movie (projector) while staring at the spectacular scenery as we have All the iconic buildings: KLCC, KL tower, TRX, Merdeka 118. Having a small drink with your love one at the balcony and chatting all night long ❤️ Not to forget the Master room as we got you a 58" smart TV 😍😍😍',
    address: 'Kuala Lumpur, Wilayah Persekutuan, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.1216812571370345, lng: 101.71523306831017 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'EstherLiving',
  },
  {
    title: 'Kids Dinosaur Bukit Bintang Linked Lalaport Mall', // HomeRumi - 3
    description:
      'Our place is located at Jalan Hang Tuah, Pudu, Kuala Lumpur in Bukit Bintang City Centre. This condominium is linked to LALAPORT Mall, there will be a walkway which can walk to the mall. This is a Kids friendly fully furnished studio unit . A perfect weekend getaways for couple, friends and small family .Our unit can accommodate 4 pax. This unit with air-con and we provide basic cooking utensils for light cooking. We provide basic amenities such as towels, bath robes for 2 adults 2 kids, shampoo, body wash, washing machine, Smart TV with youtube&netflix apps , hair dryer and etc.',
    address:
      'Pudu, 55200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    location_coordinate: { lat: 3.138167637534603, lng: 101.7076768660777 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'HomeRumi',
  },
  {
    title: '1BR- BTS Ekamai 300m-Sky infinity Pool&Gym-2 pools', // RentWithZanna - 2
    description:
      'DBF Riverside is a private accomodation situated on the bank of Chao Phraya river. This cozy property has 4 storeys with only 1 bedroom and a private bathroom on each floor. 5 mins walk to Krungton Bridge Pier where you are able to take an express boat along Chao Phraya river and 15 mins walk to MRT Sirindhron station (blue line). This building is surrounded by street vendors and local markets.',
    address: 'Phra Khanong, Khlong Toei, Bangkok 10110, Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    location_coordinate: { lat: 13.717148387002318, lng: 100.58254188908705 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'RentWithZanna',
  },
  {
    title: 'Private Studio Apartment By the River (4th Floor)', // RentWithZanna - 3
    description:
      'This is not a shared apartment. It includes 1 bedroom, 1 livingroom, 1 bathroom and balcony (completely privite)',
    address: 'Bang Yi Khan, Bang Phlat, Bangkok 10700, Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    location_coordinate: { lat: 13.780706631126854, lng: 100.49811603080663 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'RentWithZanna',
  },
  {
    title: 'Double volume family suite at Hua Mak Station', // RentWithZanna - 4
    description:
      'เที่ยวได้ทั้งครอบครัวเมื่อเข้าพักในที่พักใจกลางเมือง ชั้น 18ติดรถไฟฟ้า 2 สาย ที่สถานีหัวหมาก และสถานีพัฒนาการ เข้าเมืองเพียง 10นาที และไปสนามบินสุวรรณภูมิเพียง 15 นาที พื้นที่กว้างขวาง 2 ห้องนอน พร้อมครัว และกิจกรรมมากมายภายในอาคาร. The room is in 18th floor of the building. There are many facilities at the 9th floor such as a swimming pool, games room, gym, lobby and watching machines area. Including 7-11 store at ground floor in the back.',
    address: 'Suan Luang, Bangkok 10250, Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    location_coordinate: { lat: 13.738037289247261, lng: 100.64287704385515 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'RentWithZanna',
  },
  {
    title: 'Villa Room with Lake View', // RentWithZanna - 5
    description:
      'We are a small hotel located near Suvarnabhumi Airport. We offer you a homey vibes while your stay which surrounded by greeness and the best lake view. You can also enjoy our authentic Thai restaurant ( Ploen Ploen Restaurant ) which located just a few step from your room and you still get the lake view while having dinner. Come and experience these by yourself.',
    address:
      '22/3 ซอย ร่มเกล้า 1 Khwaeng Khlong Song Ton Nun, Khet Lat Krabang, Krung Thep Maha Nakhon 10520, Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    location_coordinate: { lat: 13.733904113094141, lng: 100.73822622864843 },
    contact_person: '039284829',
    categoriesId: 2,
    tenant_name: 'RentWithZanna',
  },
  {
    title: 'BTS ThongLor/素坤逸精品一居室/全新泳池/健身房/超棒采光', // RentWithZanna - 6
    description:
      ' 曼谷富人区, 素坤逸核心区全新168公寓。步行8分钟可到BTS Thonglo站。坐地铁可方便直达曼谷各大商圈和景区 Emquartier/Emporium, Terminal 21, Siam等。免费奢享超长泳池+健身房，体验独一无二的热带度假风情小区。 公寓楼下商业丰富, 包括711、泰日韩餐厅、酒吧, 距大型超市Big C仅800米。 由【新出海民宿品牌】统一管理，严选专业保洁团队，每客一扫一换一消毒, 保证清洁品质. 1对1管家式服, 入住/退房全程无忧, 同时给您最Local的旅游/美食推荐.',
    address: 'Khlong Tan, Khlong Toei, Bangkok 10110, Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    location_coordinate: { lat: 13.722586726462374, lng: 100.57529526521041 },
    contact_person: '039284829',
    categoriesId: 1,
    tenant_name: 'RentWithZanna',
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
  [
    {
      capacity: 10, // Adhiraa - 1
      bed_details: '5 Queen Beds',
      price: 5217493,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // Adhiraa - 2
      bed_details: '1 Queen Bed',
      price: 424000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // Adhiraa - 3
      bed_details: '1 Queen Bed',
      price: 665000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // Jakarta Stays - 1
      bed_details: '1 Queen Bed 1 Twin Bed',
      price: 665000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 16, // Jakarta Stays - 2
      bed_details: '5 Queen Beds 3 Twin Beds',
      price: 2800000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 5, // EstherLiving - 1
      bed_details: '2 Queen Beds 1 Twin Bed',
      price: 747399,
      stock: 1,
    },
  ],
  [
    {
      capacity: 8, // EstherLiving - 2
      bed_details: '2 Queen Beds 2 Twin Beds',
      price: 812000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // EstherLiving - 3
      bed_details: '1 Queen Bed 1 Twin Bed',
      price: 900000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 8, // EstherLiving - 4
      bed_details: '2 King Beds 2 Twin Beds',
      price: 2900000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 6, // RentWithZanna - 1
      bed_details: '6 Single Beds',
      price: 850000,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // Compass Stay - 1
      bed_details: '2 Queen Beds',
      price: 1807679,
      stock: 1,
    },
  ],
  [
    {
      capacity: 5, // HomeByEika - 1
      bed_details: '4 Single Beds',
      price: 3049426,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // HomeByEika - 2
      bed_details: '2 Queen Beds',
      price: 2541188,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // HomeRumi - 1
      bed_details: '2 Single Beds',
      price: 3659311,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // HomeRumi - 2
      bed_details: '1 Single Bed 1 Double Bed',
      price: 508238,
      stock: 1,
    },
  ],
  [
    {
      capacity: 5, // EstherLiving - 5
      bed_details: '3 Single Beds 1 Queen Bed',
      price: 721320,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // EstherLiving - 6
      bed_details: '3 Single Beds',
      price: 521763,
      stock: 1,
    },
  ],
  [
    {
      capacity: 10, // EstherLiving - 7
      bed_details: '1 King Bed 2 Queen Beds  2 Single Beds',
      price: 692206,
      stock: 1,
    },
  ],
  [
    {
      capacity: 7, // EstherLiving - 8
      bed_details: '2 Queen Beds  2 Single Beds',
      price: 1043526,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // HomeRumi - 3
      bed_details: '2 Single Beds',
      price: 1307886,
      stock: 1,
    },
  ],
  [
    {
      capacity: 1, // RentWithZanna - 2
      bed_details: '1 Queen Bed',
      price: 1165559,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // RentWithZanna - 3
      bed_details: '1 Queen Bed',
      price: 535175,
      stock: 1,
    },
  ],
  [
    {
      capacity: 4, // RentWithZanna - 4
      bed_details: '1 Queen Bed 2 Single Bed',
      price: 1235475,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // RentWithZanna - 5
      bed_details: '1 Queen Bed',
      price: 1056970,
      stock: 1,
    },
  ],
  [
    {
      capacity: 2, // RentWithZanna - 6
      bed_details: '1 Queen Bed',
      price: 464977,
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
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16],
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // Adhiraa - 1
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // Adhiraa - 2
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // Adhiraa - 3
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // Jakarta Stays - 1
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 4, 5, 3, 10, 19, 15, 11, 13, 16], // Jakarta Stays - 2
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 1
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 2
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 3
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 4
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 1
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // Compass Stay - 1
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // HomeByEika - 1
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // HomeByEika - 2
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // HomeRumi - 1
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // HomeRumi - 2
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 5
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 6
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 7
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // EstherLiving - 8
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // HomeRumi - 3
  },
  {
    facilitiesId_list: [1, 2, 7, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 2
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 3
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 4
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 5
  },
  {
    facilitiesId_list: [1, 2, 8, 18, 17, 9, 3, 10, 19, 15, 11, 13, 16], // RentWithZanna - 6
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
  [
    { image_url: process.env.SERVER_URL + '/src/image/rumah_jakbar_1.webp' }, // Adhiraa - 1
    { image_url: process.env.SERVER_URL + '/src/image/rumah_jakbar_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_jakbar_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_jakbar_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_jakbar_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/the_writersroom_1.webp' }, // Adhiraa - 2
    { image_url: process.env.SERVER_URL + '/src/image/the_writersroom_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/the_writersroom_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/the_writersroom_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/the_writersroom_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/gold_coast_1.webp' }, // Adhiraa - 3
    { image_url: process.env.SERVER_URL + '/src/image/gold_coast_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gold_coast_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gold_coast_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gold_coast_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/rumah_miring_1.webp' }, // Jakarta Stays - 1
    { image_url: process.env.SERVER_URL + '/src/image/rumah_miring_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_miring_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_miring_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rumah_miring_5.webp' },
  ],
  [
    {
      image_url: process.env.SERVER_URL + '/src/image/casa_de_victoria_1.webp', // Jakarta Stays - 2
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/casa_de_victoria_2.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/casa_de_victoria_3.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/casa_de_victoria_4.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/casa_de_victoria_5.webp',
    },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/gluck_star_1.webp' }, // EstherLiving - 1
    { image_url: process.env.SERVER_URL + '/src/image/gluck_star_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gluck_star_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gluck_star_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/gluck_star_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/casa_lembang_1.webp' }, // EstherLiving - 2
    { image_url: process.env.SERVER_URL + '/src/image/casa_lembang_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/casa_lembang_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/casa_lembang_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/casa_lembang_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/vila_serena_1.webp' }, // EstherLiving - 3
    { image_url: process.env.SERVER_URL + '/src/image/vila_serena_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/vila_serena_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/vila_serena_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/vila_serena_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/twelve_stones_1.webp' }, // EstherLiving - 4
    { image_url: process.env.SERVER_URL + '/src/image/twelve_stones_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/twelve_stones_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/twelve_stones_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/twelve_stones_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/winds_cabin_1.webp' }, // RentWithZanna - 1
    { image_url: process.env.SERVER_URL + '/src/image/winds_cabin_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/winds_cabin_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/winds_cabin_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/winds_cabin_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/yanaka_snow_1.webp' }, // Compass Stay - 1
    { image_url: process.env.SERVER_URL + '/src/image/yanaka_snow_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/yanaka_snow_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/yanaka_snow_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/yanaka_snow_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/rm_asakusa_1.webp' }, // HomeByEika - 1
    { image_url: process.env.SERVER_URL + '/src/image/rm_asakusa_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rm_asakusa_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rm_asakusa_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/rm_asakusa_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/bandara_haneda_1.webp' }, // HomeByEika - 2
    { image_url: process.env.SERVER_URL + '/src/image/bandara_haneda_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/bandara_haneda_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/bandara_haneda_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/bandara_haneda_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/asakusa_1.webp' }, // HomeRumi - 1
    { image_url: process.env.SERVER_URL + '/src/image/asakusa_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asakusa_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asakusa_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/asakusa_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/201_asakadai_1.webp' }, // HomeRumi - 2
    { image_url: process.env.SERVER_URL + '/src/image/201_asakadai_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/201_asakadai_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/201_asakadai_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/201_asakadai_5.webp' },
  ],
  [
    {
      image_url: process.env.SERVER_URL + '/src/image/the_birdseye_view_1.webp', // EstherLiving - 5
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/the_birdseye_view_2.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/the_birdseye_view_3.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/the_birdseye_view_4.webp',
    },
    {
      image_url: process.env.SERVER_URL + '/src/image/the_birdseye_view_5.webp',
    },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/alla_moda_1.webp' }, // EstherLiving - 6
    { image_url: process.env.SERVER_URL + '/src/image/alla_moda_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/alla_moda_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/alla_moda_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/alla_moda_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/nidoz_1.webp' }, // EstherLiving - 7
    { image_url: process.env.SERVER_URL + '/src/image/nidoz_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/nidoz_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/nidoz_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/nidoz_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/fun_suite_1.webp' }, // EstherLiving - 8
    { image_url: process.env.SERVER_URL + '/src/image/fun_suite_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/fun_suite_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/fun_suite_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/fun_suite_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/dinosaur_1.webp' }, // HomeRumi - 3
    { image_url: process.env.SERVER_URL + '/src/image/dinosaur_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dinosaur_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dinosaur_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/dinosaur_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/ekamai_1.webp' }, // RentWithZanna - 2
    { image_url: process.env.SERVER_URL + '/src/image/ekamai_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ekamai_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ekamai_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/ekamai_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/riverside_1.webp' }, // RentWithZanna - 3
    { image_url: process.env.SERVER_URL + '/src/image/riverside_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/riverside_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/riverside_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/riverside_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/hua_mak_1.webp' }, // RentWithZanna - 4
    { image_url: process.env.SERVER_URL + '/src/image/hua_mak_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/hua_mak_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/hua_mak_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/hua_mak_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/lake_view_1.webp' }, // RentWithZanna - 5
    { image_url: process.env.SERVER_URL + '/src/image/lake_view_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/lake_view_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/lake_view_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/lake_view_5.webp' },
  ],
  [
    { image_url: process.env.SERVER_URL + '/src/image/thonglor_1.webp' }, // RentWithZanna - 6
    { image_url: process.env.SERVER_URL + '/src/image/thonglor_2.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thonglor_3.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thonglor_4.webp' },
    { image_url: process.env.SERVER_URL + '/src/image/thonglor_5.webp' },
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
      display_name: tenant.display_name,
      usersId: createdUsers.find((user) => user.email == tenant.email).uid,
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

  // console.log('Tenant Profile', createdTenantProfiles);

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

  // console.log(createdListings);

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

  // console.log(bookings);

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
