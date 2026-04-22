import mongoose from "mongoose";
import { config } from "./config.js";
import Package from "./models/Package.js";
import Review from "./models/Review.js";

const packages = [
  {
    title: "Bali Paradise Retreat",
    slug: "bali-paradise-retreat",
    destination: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description:
      "Immerse yourself in the magical island of Bali. Explore ancient temples, lush rice terraces, pristine beaches, and vibrant culture. This 7-day retreat combines relaxation with adventure for an unforgettable tropical experience.",
    highlights: [
      "Visit Uluwatu Temple at sunset",
      "Explore Tegallalang Rice Terraces",
      "Snorkeling at Nusa Penida",
      "Traditional Balinese cooking class",
      "Spa and wellness treatments",
    ],
    duration: 7,
    groupSize: 15,
    price: 1299,
    discountPrice: 1099,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&h=600&fit=crop",
    ],
    included: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Guided tours", "Snorkeling gear"],
    excluded: ["International flights", "Travel insurance", "Personal expenses", "Lunch & dinner"],
    itinerary: [
      { day: 1, title: "Arrival & Welcome", description: "Airport pickup, hotel check-in, welcome dinner with traditional Balinese dance performance." },
      { day: 2, title: "Temple & Culture", description: "Visit Tanah Lot and Uluwatu temples. Evening Kecak dance show at sunset." },
      { day: 3, title: "Rice Terraces & Volcano", description: "Explore Tegallalang Rice Terraces and Mount Batur sunrise viewpoint." },
      { day: 4, title: "Beach & Water Sports", description: "Day at Nusa Dua beach with snorkeling and water sports activities." },
      { day: 5, title: "Ubud Art & Cooking", description: "Visit Ubud art market, Monkey Forest, and join a Balinese cooking class." },
      { day: 6, title: "Island Excursion", description: "Full-day boat trip to Nusa Penida with snorkeling at Crystal Bay." },
      { day: 7, title: "Spa & Departure", description: "Morning spa treatment, free time for shopping, airport transfer." },
    ],
    featured: true,
    category: "beach",
    startDates: [new Date("2026-06-15"), new Date("2026-07-20"), new Date("2026-08-10")],
  },
  {
    title: "Swiss Alps Adventure",
    slug: "swiss-alps-adventure",
    destination: "Interlaken",
    country: "Switzerland",
    continent: "Europe",
    description:
      "Conquer the majestic Swiss Alps on this thrilling adventure package. From paragliding over Interlaken to hiking through pristine mountain trails, this trip offers breathtaking landscapes and adrenaline-pumping activities.",
    highlights: [
      "Paragliding over Interlaken",
      "Jungfraujoch – Top of Europe",
      "Lake Thun boat cruise",
      "Alpine hiking trails",
      "Swiss chocolate factory visit",
    ],
    duration: 6,
    groupSize: 12,
    price: 2499,
    discountPrice: 2199,
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    included: ["Chalet accommodation", "Daily breakfast & dinner", "All activity fees", "Mountain rail passes", "Expert guides"],
    excluded: ["Flights", "Travel insurance", "Lunches", "Personal gear"],
    itinerary: [
      { day: 1, title: "Arrival in Interlaken", description: "Transfer to mountain chalet, evening orientation and welcome fondue dinner." },
      { day: 2, title: "Jungfraujoch Excursion", description: "Train ride to the Top of Europe at 3,454m. Visit the Ice Palace and Sphinx Observatory." },
      { day: 3, title: "Paragliding & Lake Cruise", description: "Morning tandem paragliding flight, afternoon boat cruise on Lake Thun." },
      { day: 4, title: "Alpine Hiking", description: "Guided hike through Lauterbrunnen Valley with 72 waterfalls." },
      { day: 5, title: "Grindelwald & Chocolate", description: "Explore Grindelwald village and visit a Swiss chocolate factory." },
      { day: 6, title: "Free Morning & Departure", description: "Free time for souvenir shopping, transfer to airport." },
    ],
    featured: true,
    category: "adventure",
    startDates: [new Date("2026-06-01"), new Date("2026-07-15"), new Date("2026-09-01")],
  },
  {
    title: "Safari & Serengeti Explorer",
    slug: "safari-serengeti-explorer",
    destination: "Serengeti",
    country: "Tanzania",
    continent: "Africa",
    description:
      "Witness the greatest wildlife spectacle on Earth. This safari takes you through the Serengeti National Park and Ngorongoro Crater to see the Big Five and the Great Migration up close.",
    highlights: [
      "Big Five game drives",
      "Great Migration viewing",
      "Ngorongoro Crater descent",
      "Maasai village visit",
      "Hot air balloon safari",
    ],
    duration: 8,
    groupSize: 10,
    price: 3499,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop",
    ],
    included: ["Lodge & tented camp stays", "All meals", "4x4 safari vehicle", "Park entrance fees", "Professional guide"],
    excluded: ["International flights", "Visa fees", "Travel insurance", "Balloon safari ($500 optional)"],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Welcome at Kilimanjaro Airport, transfer to lodge, trip briefing." },
      { day: 2, title: "Tarangire National Park", description: "Full-day game drive spotting elephants, baobab trees, and diverse birdlife." },
      { day: 3, title: "Ngorongoro Crater", description: "Descend into the world's largest caldera for incredible wildlife concentration." },
      { day: 4, title: "Serengeti – Central", description: "Drive to central Serengeti with game viewing en route. Sunset at camp." },
      { day: 5, title: "Serengeti Game Drives", description: "Full day exploring the Serengeti plains. Big Five sightings." },
      { day: 6, title: "Migration & Balloon", description: "Optional dawn balloon safari. Continue game drives following the migration." },
      { day: 7, title: "Maasai Culture", description: "Visit a Maasai village, learn about traditions, afternoon game drive." },
      { day: 8, title: "Departure", description: "Morning bush walk, flight back to Arusha, onward travel." },
    ],
    featured: true,
    category: "wildlife",
    startDates: [new Date("2026-06-20"), new Date("2026-08-15"), new Date("2026-10-01")],
  },
  {
    title: "Santorini Luxury Escape",
    slug: "santorini-luxury-escape",
    destination: "Santorini",
    country: "Greece",
    continent: "Europe",
    description:
      "Indulge in the ultimate luxury getaway on the stunning island of Santorini. Enjoy world-class dining, infinity pool sunsets, wine tasting, and private catamaran cruises along the caldera.",
    highlights: [
      "Private caldera sunset cruise",
      "Wine tasting at Santo Wines",
      "Oia village exploration",
      "Infinity pool overlooking the sea",
      "Greek cooking masterclass",
    ],
    duration: 5,
    groupSize: 8,
    price: 2899,
    discountPrice: 2599,
    rating: 4.7,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&h=600&fit=crop",
    ],
    included: ["5-star boutique hotel", "Daily breakfast", "Catamaran cruise", "Wine tasting", "Airport transfers"],
    excluded: ["Flights", "Travel insurance", "Additional meals", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival & Sunset", description: "Airport transfer to boutique hotel in Oia, welcome cocktails at sunset." },
      { day: 2, title: "Caldera Cruise", description: "Private catamaran cruise along the caldera with swimming and BBQ lunch." },
      { day: 3, title: "Wine & Culture", description: "Wine tasting tour, visit Akrotiri archaeological site, cooking class." },
      { day: 4, title: "Beach & Relaxation", description: "Visit Red Beach and Perissa, spa afternoon, farewell dinner." },
      { day: 5, title: "Departure", description: "Leisurely breakfast, free time, airport transfer." },
    ],
    featured: true,
    category: "luxury",
    startDates: [new Date("2026-05-15"), new Date("2026-06-20"), new Date("2026-09-10")],
  },
  {
    title: "Japan Cultural Journey",
    slug: "japan-cultural-journey",
    destination: "Tokyo & Kyoto",
    country: "Japan",
    continent: "Asia",
    description:
      "Discover the perfect blend of ancient tradition and futuristic innovation in Japan. From the neon-lit streets of Tokyo to the serene temples of Kyoto, experience a culture like no other.",
    highlights: [
      "Tokyo's Shibuya & Akihabara",
      "Mount Fuji day trip",
      "Kyoto's Golden Pavilion",
      "Traditional tea ceremony",
      "Bullet train experience",
    ],
    duration: 10,
    groupSize: 14,
    price: 3199,
    discountPrice: 2899,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
    ],
    included: ["Hotel stays", "Daily breakfast", "JR Rail Pass", "Guided tours", "Tea ceremony"],
    excluded: ["International flights", "Travel insurance", "Lunches & dinners", "Personal shopping"],
    itinerary: [
      { day: 1, title: "Tokyo Arrival", description: "Airport pickup, check-in, evening walk through Shinjuku." },
      { day: 2, title: "Tokyo Highlights", description: "Visit Senso-ji, Akihabara, Shibuya Crossing, and Harajuku." },
      { day: 3, title: "Tsukiji & Odaiba", description: "Morning fish market, TeamLab Borderless, dinner in Roppongi." },
      { day: 4, title: "Mount Fuji Excursion", description: "Day trip to Mount Fuji 5th station and Hakone hot springs." },
      { day: 5, title: "Bullet Train to Kyoto", description: "Shinkansen ride, afternoon explore Fushimi Inari's thousand torii gates." },
      { day: 6, title: "Kyoto Temples", description: "Visit Kinkaku-ji, Ryoan-ji rock garden, and Arashiyama Bamboo Grove." },
      { day: 7, title: "Nara Day Trip", description: "Meet the sacred deer, visit Todai-ji temple housing the Great Buddha." },
      { day: 8, title: "Tea & Geisha District", description: "Traditional tea ceremony, explore Gion geisha district." },
      { day: 9, title: "Osaka Food Tour", description: "Day trip to Osaka for street food in Dotonbori and Osaka Castle." },
      { day: 10, title: "Departure", description: "Free morning, transfer to Kansai International Airport." },
    ],
    featured: true,
    category: "cultural",
    startDates: [new Date("2026-04-01"), new Date("2026-10-15"), new Date("2026-11-20")],
  },
  {
    title: "Maldives Honeymoon Package",
    slug: "maldives-honeymoon-package",
    destination: "Maldives",
    country: "Maldives",
    continent: "Asia",
    description:
      "Celebrate love in paradise. This exclusive honeymoon package offers overwater villas, private dining on the beach, couples spa treatments, and crystal-clear waters for the most romantic getaway.",
    highlights: [
      "Overwater villa stay",
      "Private beach dinner",
      "Couples spa treatment",
      "Sunset dolphin cruise",
      "Underwater snorkeling safari",
    ],
    duration: 6,
    groupSize: 2,
    price: 4599,
    discountPrice: 3999,
    rating: 4.9,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&h=600&fit=crop",
    ],
    included: ["Overwater villa", "All meals & drinks", "Speedboat transfers", "Spa package", "Dolphin cruise"],
    excluded: ["International flights", "Travel insurance", "Premium alcohol", "Diving excursions"],
    itinerary: [
      { day: 1, title: "Arrival in Paradise", description: "Speedboat to resort, champagne welcome, villa tour." },
      { day: 2, title: "Beach & Spa", description: "Morning beach relaxation, afternoon couples spa treatment." },
      { day: 3, title: "Underwater Adventure", description: "Guided snorkeling safari, lunch on sandbank, sunset yoga." },
      { day: 4, title: "Dolphin Cruise", description: "Sunset dolphin watching cruise, private beach dinner under stars." },
      { day: 5, title: "Island Hopping", description: "Visit local islands, traditional fishing experience." },
      { day: 6, title: "Departure", description: "Floating breakfast, photo session, speedboat transfer." },
    ],
    featured: false,
    category: "honeymoon",
    startDates: [new Date("2026-05-01"), new Date("2026-12-15"), new Date("2027-02-14")],
  },
  {
    title: "Patagonia Trekking Expedition",
    slug: "patagonia-trekking-expedition",
    destination: "Torres del Paine",
    country: "Chile",
    continent: "South America",
    description:
      "Trek through one of the world's most spectacular wilderness areas. Patagonia's Torres del Paine offers dramatic peaks, glaciers, and pristine lakes that will take your breath away.",
    highlights: [
      "W-Trek iconic route",
      "Grey Glacier viewpoint",
      "Lake Pehoe panorama",
      "Condor watching",
      "Patagonian estancia visit",
    ],
    duration: 9,
    groupSize: 10,
    price: 2799,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 54,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    ],
    included: ["Mountain refugios", "All meals on trek", "Expert guide", "Park fees", "Equipment rental"],
    excluded: ["Flights to Punta Arenas", "Travel insurance", "Sleeping bag rental", "Tips"],
    itinerary: [
      { day: 1, title: "Punta Arenas Arrival", description: "Arrive, city tour, trip briefing and gear check." },
      { day: 2, title: "Transfer to Park", description: "Drive to Torres del Paine, settle into refugio." },
      { day: 3, title: "W-Trek Day 1", description: "Hike to the Base of the Towers – the iconic viewpoint." },
      { day: 4, title: "W-Trek Day 2", description: "Trek through French Valley with panoramic mountain views." },
      { day: 5, title: "W-Trek Day 3", description: "Hike to Grey Glacier, witness massive icebergs." },
      { day: 6, title: "Lake District", description: "Catamaran across Lake Pehoe, afternoon nature walk." },
      { day: 7, title: "Wildlife & Estancia", description: "Visit Patagonian ranch, horseback riding, condor spotting." },
      { day: 8, title: "Glacier Kayaking", description: "Optional kayaking near Grey Glacier, celebration dinner." },
      { day: 9, title: "Departure", description: "Transfer to Punta Arenas airport." },
    ],
    featured: false,
    category: "adventure",
    startDates: [new Date("2026-11-01"), new Date("2027-01-15"), new Date("2027-03-01")],
  },
  {
    title: "Dubai Family Fun Package",
    slug: "dubai-family-fun-package",
    destination: "Dubai",
    country: "UAE",
    continent: "Asia",
    description:
      "The ultimate family holiday in the city of superlatives! From the world's tallest building to thrilling theme parks and desert safaris, Dubai offers non-stop fun for all ages.",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with BBQ dinner",
      "Dubai Aquarium & Underwater Zoo",
      "IMG Worlds of Adventure",
      "Dhow cruise on Dubai Creek",
    ],
    duration: 6,
    groupSize: 20,
    price: 1899,
    discountPrice: 1699,
    rating: 4.6,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop",
    ],
    included: ["4-star hotel", "Daily breakfast", "Theme park tickets", "Desert safari", "Airport transfers"],
    excluded: ["Flights", "Travel insurance", "Lunches & dinners", "Shopping expenses"],
    itinerary: [
      { day: 1, title: "Arrival & City Tour", description: "Hotel check-in, evening Dhow cruise on Dubai Creek with dinner." },
      { day: 2, title: "Iconic Dubai", description: "Burj Khalifa, Dubai Mall, Dubai Fountain show." },
      { day: 3, title: "Theme Park Day", description: "Full day at IMG Worlds of Adventure." },
      { day: 4, title: "Desert Adventure", description: "Morning at the beach, afternoon desert safari with dune bashing and BBQ." },
      { day: 5, title: "Aquarium & Old Dubai", description: "Dubai Aquarium, Gold Souk, Spice Souk exploration." },
      { day: 6, title: "Departure", description: "Free morning for last-minute shopping, airport transfer." },
    ],
    featured: false,
    category: "family",
    startDates: [new Date("2026-06-10"), new Date("2026-10-20"), new Date("2026-12-20")],
  },
];

const reviews = [
  {
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    rating: 5,
    comment: "The Bali retreat was absolutely magical! Every detail was perfectly planned. The temple visits at sunset were breathtaking, and our guide was incredibly knowledgeable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Rodriguez",
    email: "james@example.com",
    rating: 5,
    comment: "Swiss Alps Adventure exceeded all expectations! Paragliding over Interlaken was a once-in-a-lifetime experience. The mountain views were unreal.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Chen",
    email: "emily@example.com",
    rating: 5,
    comment: "Japan was a dream come true. The perfect mix of tradition and modernity. The bullet train ride and temple visits in Kyoto were unforgettable highlights.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Okonkwo",
    email: "david@example.com",
    rating: 5,
    comment: "Seeing the Great Migration in Serengeti was the most incredible wildlife experience of my life. Our guide spotted every animal. Worth every penny!",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Lisa Thompson",
    email: "lisa@example.com",
    rating: 4,
    comment: "Santorini was pure luxury! The sunset from our hotel was spectacular, and the catamaran cruise was the highlight. Will definitely come back.",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "Marco Rossi",
    email: "marco@example.com",
    rating: 5,
    comment: "Patagonia trekking was challenging but incredibly rewarding. The views of Torres del Paine are something you have to see to believe. Top-notch guides!",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

async function seed() {
  await mongoose.connect(config.mongoUri);
  console.log("Connected to MongoDB for seeding…");

  await Package.deleteMany({});
  await Review.deleteMany({});
  console.log("Cleared existing data.");

  const created = await Package.insertMany(packages);
  console.log(`Seeded ${created.length} travel packages.`);

  const reviewDocs = reviews.map((r, i) => ({
    ...r,
    packageId: created[i % created.length]._id,
  }));
  await Review.insertMany(reviewDocs);
  console.log(`Seeded ${reviewDocs.length} reviews.`);

  await mongoose.disconnect();
  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
