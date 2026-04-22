import { Link } from "react-router-dom";
import { HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineUsers, HiOutlineLightBulb } from "react-icons/hi";

const values = [
  {
    icon: HiOutlineGlobeAlt,
    title: "Sustainable Travel",
    desc: "We promote eco-friendly tourism and partner with local communities to minimize our environmental footprint while maximizing positive impact.",
  },
  {
    icon: HiOutlineHeart,
    title: "Passion for Adventure",
    desc: "Every trip we design is born from genuine passion. Our team of seasoned travelers personally vets every destination and activity.",
  },
  {
    icon: HiOutlineUsers,
    title: "Customer First",
    desc: "Your satisfaction is our top priority. We listen to your needs and craft personalized experiences that exceed expectations.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Innovation",
    desc: "We constantly innovate our offerings, leveraging technology and local expertise to create unique, one-of-a-kind travel experiences.",
  },
];

const team = [
  {
    name: "Alexandra Reed",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "15+ years of travel industry experience. Visited 80+ countries.",
  },
  {
    name: "Marcus Chen",
    role: "Head of Operations",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    bio: "Expert in logistics and travel planning across Asia and Europe.",
  },
  {
    name: "Priya Sharma",
    role: "Lead Travel Designer",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Creates bespoke itineraries that blend culture, adventure, and relaxation.",
  },
  {
    name: "Daniel Okafor",
    role: "Africa & Adventure Specialist",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "Safari expert and certified mountain guide with 10+ years in the field.",
  },
];

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-slate-900 py-20">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=400&fit=crop"
          alt="About hero"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">About Us</h1>
          <p className="mt-4 text-lg text-slate-300">
            Crafting extraordinary travel experiences since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Our Story</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Wanderlust Travels was born from a simple belief: that travel has the power to
              transform lives. Founded in 2010 by Alexandra Reed after a life-changing solo
              journey through Southeast Asia, our agency has grown from a small office in New
              York to a globally recognized travel company serving over 15,000 happy travelers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We don&apos;t just book trips — we design experiences. Every package is carefully
              crafted by our team of travel experts who have personally explored each destination.
              We believe in authentic travel that connects you with local cultures, breathtaking
              landscapes, and unforgettable moments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Whether you&apos;re seeking a relaxing beach getaway, an adrenaline-pumping
              adventure, or a deep cultural immersion, Wanderlust Travels is your trusted partner
              in making travel dreams come true.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=500&fit=crop"
              alt="Travel road"
              className="rounded-2xl object-cover h-64 w-full"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&h=500&fit=crop"
              alt="Hot air balloons"
              className="mt-8 rounded-2xl object-cover h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle mx-auto">
              The principles that guide everything we do at Wanderlust Travels.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle mx-auto">
            Passionate travelers dedicated to making your dream vacations a reality.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.name} className="card overflow-hidden text-center">
              <img
                src={t.img}
                alt={t.name}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="text-sm font-medium text-brand-600">{t.role}</p>
                <p className="mt-2 text-sm text-slate-500">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Let&apos;s Plan Your Next Adventure</h2>
          <p className="mt-4 text-brand-100">
            Get in touch with our team and let us design the perfect trip for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/packages" className="btn bg-white text-brand-700 hover:bg-slate-50 px-8 py-3 font-bold">
              View Packages
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
