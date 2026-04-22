import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const continents = [
  {
    name: 'Asia',
    description: 'From ancient temples to pristine beaches, Asia offers a kaleidoscope of cultures, cuisines, and breathtaking landscapes.',
    destinations: [
      { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500', packages: 3 },
      { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500', packages: 2 },
      { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500', packages: 1 },
    ],
  },
  {
    name: 'Europe',
    description: 'Explore centuries of history, stunning architecture, and world-renowned cuisine across the diverse nations of Europe.',
    destinations: [
      { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500', packages: 2 },
      { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500', packages: 1 },
      { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500', packages: 1 },
    ],
  },
  {
    name: 'Africa',
    description: 'Witness the raw power of nature on safari, explore ancient civilizations, and experience vibrant cultures across the continent.',
    destinations: [
      { name: 'Serengeti, Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500', packages: 2 },
      { name: 'Cape Town, South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500', packages: 1 },
      { name: 'Marrakech, Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=500', packages: 1 },
    ],
  },
  {
    name: 'South America',
    description: 'Discover ancient ruins, lush rainforests, and vibrant cities across the diverse landscapes of South America.',
    destinations: [
      { name: 'Machu Picchu, Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d163571?w=500', packages: 1 },
      { name: 'Rio de Janeiro, Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500', packages: 1 },
      { name: 'Patagonia, Argentina', image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aed1?w=500', packages: 1 },
    ],
  },
  {
    name: 'North America',
    description: 'From tropical rainforests to volcanic hot springs, Central and North America offer incredible eco-adventures and natural beauty.',
    destinations: [
      { name: 'Costa Rica', image: 'https://images.unsplash.com/photo-1518259102261-b57d45c39e49?w=500', packages: 1 },
      { name: 'Grand Canyon, USA', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=500', packages: 1 },
      { name: 'Cancún, Mexico', image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=500', packages: 1 },
    ],
  },
];

export default function Destinations() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Destinations
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore our handpicked destinations across every continent. Each location has been carefully selected for its unique beauty and cultural significance.
          </p>
        </div>
      </section>

      {/* Destinations by Continent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {continents.map((continent, idx) => (
          <section key={continent.name}>
            <div className={`flex flex-col lg:flex-row gap-10 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/3 flex flex-col justify-center">
                <h2 className="section-title text-3xl mb-3">{continent.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{continent.description}</p>
                <Link
                  to={`/packages?continent=${encodeURIComponent(continent.name)}`}
                  className="flex items-center gap-2 text-accent-500 hover:text-accent-600 font-medium"
                >
                  View Packages <FiArrowRight />
                </Link>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {continent.destinations.map((dest) => (
                  <Link
                    key={dest.name}
                    to={`/packages?search=${encodeURIComponent(dest.name.split(',')[0])}`}
                    className="group relative rounded-xl overflow-hidden h-64"
                  >
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-semibold">{dest.name}</h3>
                      <p className="text-white/70 text-sm">{dest.packages} package{dest.packages !== 1 ? 's' : ''}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Can&apos;t Find Your Dream Destination?
          </h2>
          <p className="text-white/70 mb-8">
            We can create custom itineraries for any destination in the world. Contact our travel experts today!
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
