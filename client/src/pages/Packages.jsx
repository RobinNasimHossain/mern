import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineSearch, HiOutlineAdjustments } from "react-icons/hi";
import api from "../api.js";
import PackageCard from "../components/PackageCard.jsx";
import Spinner from "../components/Spinner.jsx";

const SORT_OPTIONS = [
  { value: "", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "duration", label: "Shortest Duration" },
];

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    api.get("/packages/categories").then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    if (searchParams.get("search")) params.set("search", searchParams.get("search"));

    api
      .get(`/packages?${params.toString()}`)
      .then((r) => setPackages(r.data))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, [category, sort, searchParams]);

  function handleSearch(e) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (search.trim()) next.set("search", search.trim());
    else next.delete("search");
    setSearchParams(next);
  }

  function setFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <>
      {/* Header */}
      <section className="relative bg-slate-900 py-20">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=400&fit=crop"
          alt="Travel banner"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Our Travel Packages
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Browse our curated collection of world-class travel experiences
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations, packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <HiOutlineAdjustments className="h-5 w-5 text-slate-500" />
              <select
                value={category}
                onChange={(e) => setFilter("category", e.target.value)}
                className="input w-auto"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sort}
              onChange={(e) => setFilter("sort", e.target.value)}
              className="input w-auto"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Spinner />
        ) : packages.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-500">
              No packages found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm text-slate-500">
              Showing {packages.length} package{packages.length !== 1 ? "s" : ""}
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
