
import { useEffect, useState } from "react";

import {
  Search,
  MapPin,
  BadgeCheck,
  Star,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Wrench,
  Paintbrush,
  Hammer,
  AirVent,
  Zap,
  Scissors,
  UserRound,
} from "lucide-react";

import {
  getCategories,
  getServiceCategories,
} from "../services/categories";

const filterButtons = [
  {
    label: "All Categories",
    icon: null,
  },
  {
    label: "Verified Only",
    icon: <BadgeCheck size={16} />,
  },
  {
    label: "Near Me",
    icon: <MapPin size={16} />,
  },
  {
    label: "Top Rated",
    icon: <Star size={16} />,
  },
];

const getServiceIcon = (name: string) => {
  const value = name.toLowerCase();

  if (value.includes("plumb")) return <Wrench size={22} />;

  if (value.includes("paint")) return <Paintbrush size={22} />;

  if (
    value.includes("carpent") ||
    value.includes("mason") ||
    value.includes("brick")
  ) {
    return <Hammer size={22} />;
  }

  if (value.includes("ac") || value.includes("air")) {
    return <AirVent size={22} />;
  }

  if (value.includes("electric")) {
    return <Zap size={22} />;
  }

  if (
    value.includes("tailor") ||
    value.includes("fashion")
  ) {
    return <Scissors size={22} />;
  }

  return <UserRound size={22} />;
};

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] =
    useState("All Categories");

  const [popularServices, setPopularServices] =
    useState<any[]>([]);

  const [services, setServices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch Services
  const fetchServices = async (
    searchTerm = search,
    category = selectedCategory,
    sort = sortBy
  ) => {
    try {
      setLoading(true);

      const data = await getCategories(
        category || undefined,
        searchTerm || undefined,
        sort || undefined,
        50
      );

      setPopularServices(data.popular || []);
      setServices(data.all || []);
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    getServiceCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent"></div>

          <p className="mt-5 text-lg text-slate-500">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-w-0 space-y-7 sm:space-y-10">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#22324A] sm:text-3xl lg:text-[40px]">
            Categories Management
          </h1>

          <p className="mt-2 text-sm text-[#7A8797] sm:text-base lg:text-[17px]">
            Manage and monitor all service categories on the platform
          </p>
        </div>

        <div className="relative self-start">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-medium text-[#22324A] shadow-sm hover:bg-slate-50 sm:px-6"
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>

          {showFilter && (
            <div className="absolute right-0 z-50 mt-3 w-[min(288px,calc(100vw-48px))] rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xl">

              <p className="mb-2 text-sm font-semibold">
                Category
              </p>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-4 w-full rounded-lg border border-[#E5E7EB] p-2"
              >
                <option value="">All Categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <p className="mb-2 text-sm font-semibold">
                Sort
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mb-5 w-full rounded-lg border border-[#E5E7EB] p-2"
              >
                <option value="">Default</option>
                <option value="popular">Popular</option>
                <option value="name">Name</option>
              </select>

              <button
                onClick={() => {
                  fetchServices();
                  setShowFilter(false);
                }}
                className="w-full rounded-xl bg-[#17324D] py-3 text-white hover:bg-[#22476D]"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popular Services */}
      <div>
        <h2 className="mb-5 text-xl font-bold text-[#22324A] sm:mb-6 sm:text-2xl lg:text-[28px]">
          Most popular services
        </h2>

        {popularServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">
            No popular services found.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6 xl:gap-6">
            {popularServices.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-[#E8EDF2] bg-white px-2 py-6 shadow-sm transition hover:shadow-md sm:rounded-[24px] sm:py-8"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D] sm:h-14 sm:w-14">
                  {getServiceIcon(item.name)}
                </div>

                <p className="mt-4 text-center text-sm font-medium text-[#22324A] sm:mt-5 sm:text-base">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
          {filterButtons.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveFilter(item.label)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:py-3 sm:text-sm lg:px-7 ${
                activeFilter === item.label
                  ? "bg-[#17324D] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#22324A] hover:bg-[#F8FAFC]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <div className="relative w-full sm:max-w-[320px]">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={async (e) => {
                const value = e.target.value;

                setSearch(value);

                await fetchServices(value);
              }}
              placeholder="Search categories"
              className="h-12 w-full rounded-full border border-[#E5E7EB] bg-white pl-12 pr-4 text-sm outline-none focus:border-[#17324D]"
            />
          </div>

          {/* View Toggle */}
          <div className="flex w-fit overflow-hidden rounded-xl border border-[#E5E7EB]">
            <button
              onClick={() => setView("grid")}
              className={`p-3 ${
                view === "grid"
                  ? "bg-[#17324D] text-white"
                  : "bg-white text-[#22324A]"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-3 ${
                view === "list"
                  ? "bg-[#17324D] text-white"
                  : "bg-white text-[#22324A]"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#22324A] sm:text-[30px]">
          All Categories
        </h2>

        <p className="mt-2 text-sm text-[#7A8797] sm:text-base">
          Browse all available service categories
        </p>
      </div>

      {/* Category Grid */}
      {services.length === 0 ? (

        <div className="col-span-full py-16 text-center text-slate-500">
          No categories found.
        </div>

      ) : view === "grid" ? (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">

          {services.map((service) => (

            <div
              key={service._id}
              className="rounded-2xl border border-[#E8EDF2] bg-white p-5 shadow-sm transition hover:shadow-md sm:rounded-[26px] sm:p-6"
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D] sm:h-16 sm:w-16">
                {getServiceIcon(service.name)}
              </div>

              <h3 className="mt-5 text-center text-base font-semibold text-[#22324A] sm:text-lg">
                {service.name}
              </h3>

              <p className="mt-2 text-center text-sm text-[#7A8797]">
                {service.category}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#2563EB]">
                <div className="h-2 w-2 rounded-full bg-[#2563EB]" />

                <span>
                  {service.verifiedCount ?? 0} verified workers
                </span>
              </div>

              <button className="mt-6 w-full rounded-full bg-[#17324D] py-3 text-sm font-semibold text-white hover:bg-[#22476D]">
                View Workers
              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="space-y-4">

          {services.map((service) => (

            <div
              key={service._id}
              className="flex flex-col gap-4 rounded-2xl border border-[#E8EDF2] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >

              <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D] sm:h-14 sm:w-14">
                  {getServiceIcon(service.name)}
                </div>

                <div className="min-w-0">

                  <h3 className="text-base font-semibold text-[#22324A] sm:text-lg">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#7A8797]">
                    {service.category}
                  </p>

                  <p className="mt-1 text-sm text-[#2563EB]">
                    {service.verifiedCount ?? 0} verified workers
                  </p>

                </div>

              </div>

              <button className="w-full shrink-0 rounded-full bg-[#17324D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#22476D] sm:w-auto">
                View Workers
              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}
