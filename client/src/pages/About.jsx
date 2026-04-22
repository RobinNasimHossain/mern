import { Link } from 'react-router-dom';
import { FiGlobe, FiUsers, FiAward, FiHeart } from 'react-icons/fi';

const stats = [
  { icon: FiGlobe, value: '50+', label: 'Destinations' },
  { icon: FiUsers, value: '10,000+', label: 'Happy Travelers' },
  { icon: FiAward, value: '15+', label: 'Years Experience' },
  { icon: FiHeart, value: '99%', label: 'Satisfaction Rate' },
];

const team = [
  {
    name: 'Alex Thompson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    bio: 'World traveler with 20+ years of experience creating unforgettable journeys.',
  },
  {
    name: 'Maria Santos',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
    bio: 'Expert in logistics and ensuring every trip runs seamlessly from start to finish.',
  },
  {
    name: 'David Chen',
    role: 'Lead Travel Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: 'Crafts unique itineraries that blend adventure, culture, and relaxation perfectly.',
  },
  {
    name: 'Amara Okafor',
    role: 'Customer Experience Manager',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300',
    bio: 'Dedicated to making every traveler feel valued and supported throughout their journey.',
  },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920)' }}
        >
          <div className="absolute inset-0 bg-primary-900/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About Wanderlust</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Turning travel dreams into reality since 2010
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Wanderlust Travels was born from a simple belief: travel has the power to transform lives.
                  Founded in 2010 by a group of passionate adventurers, we set out to create a travel agency
                  that goes beyond ordinary tourism.
                </p>
                <p>
                  Today, we are proud to have helped over 10,000 travelers explore more than 50 destinations
                  across 6 continents. Our team of experienced travel designers works tirelessly to craft
                  unique itineraries that combine adventure, culture, relaxation, and authentic local experiences.
                </p>
                <p>
                  We believe that every journey should be as unique as the traveler taking it. That is why we
                  offer fully customizable packages, expert local guides, and round-the-clock support to ensure
                  your trip is nothing short of extraordinary.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400"
                alt="Travel moment"
                className="rounded-2xl h-64 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400"
                alt="Beautiful destination"
                className="rounded-2xl h-64 w-full object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400"
                alt="Adventure"
                className="rounded-2xl h-64 w-full object-cover -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
                alt="Culture"
                className="rounded-2xl h-64 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <s.icon className="text-3xl mx-auto mb-3 opacity-80" />
                <p className="text-3xl md:text-4xl font-bold mb-1">{s.value}</p>
                <p className="text-white/80 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The passionate people behind your dream vacations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-5 text-center">
                  <h3 className="font-heading font-semibold text-lg text-primary-900">{member.name}</h3>
                  <p className="text-accent-500 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sustainability', desc: 'We partner with eco-friendly accommodations and support local communities to minimize our environmental footprint.' },
              { title: 'Authenticity', desc: 'We design experiences that connect you with local cultures, traditions, and people for genuine, meaningful travel.' },
              { title: 'Excellence', desc: 'From the first inquiry to your return home, we strive for perfection in every detail of your journey.' },
            ].map((v) => (
              <div key={v.title} className="text-center p-8">
                <h3 className="font-heading font-semibold text-xl text-primary-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Start Your Journey Today</h2>
          <p className="text-white/70 mb-8">Let us help you plan the trip of a lifetime</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/packages" className="btn-primary">Explore Packages</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
