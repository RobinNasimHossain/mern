import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import { FiFilter, FiSearch } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || '';

const categories = ['all', 'adventure', 'beach', 'cultural', 'wildlife', 'luxury', 'honeymoon'];
const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort) params.set('sort', sort);
    const searchTerm = searchParams.get('search');
    if (searchTerm) params.set('search', searchTerm);
    const continent = searchParams.get('continent');
    if (continent) params.set('continent', continent);

    axios.get(`${API}/api/packages?${params.toString()}`)
      .then((res) => setPackages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, sort, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) newParams.set('search', search);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Travel Packages
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover our curated collection of extraordinary travel experiences around the world
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <FiFilter className="text-gray-500" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    category === cat
                      ? 'bg-accent-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <form onSubmit={handleSearch} className="relative flex-grow lg:flex-grow-0">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 w-full lg:w-56 text-sm"
                />
              </form>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm text-gray-600 bg-white"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No packages found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6">{packages.length} package{packages.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
