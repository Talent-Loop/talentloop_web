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
  // --------------------------
  // Fetch Services
  // --------------------------

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
    <section className="space-y-10">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-[40px] font-bold text-[#22324A]">
            Categories Management
          </h1>

          <p className="mt-2 text-[17px] text-[#7A8797]">
            Manage and monitor all service categories on the platform
          </p>

        </div>

        <div className="relative">

  <button
    onClick={() => setShowFilter(!showFilter)}
    className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-medium text-[#22324A] shadow-sm hover:bg-slate-50"
  >
    <SlidersHorizontal size={16} />
    Filter
  </button>

  {showFilter && (
    <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xl z-50">

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
  <h2 className="mb-6 text-[28px] font-bold text-[#22324A]">
    Most popular services
  </h2>

  {popularServices.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">
      No popular services found.
    </div>
  ) : (
    <div className="grid grid-cols-6 gap-6">
      {popularServices.map((item) => (
        <div
          key={item._id}
          className="rounded-[24px] border border-[#E8EDF2] bg-white py-8 shadow-sm transition hover:shadow-md"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D]">
            {getServiceIcon(item.name)}
          </div>

          <p className="mt-5 text-center font-medium text-[#22324A]">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

      {/* Filters */}

               <div className="flex items-center justify-between">

        <div className="flex gap-4">

          {filterButtons.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveFilter(item.label)}
              className={`flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition ${
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

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="relative">

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
              className="h-12 w-[320px] rounded-full border border-[#E5E7EB] bg-white pl-12 pr-4 outline-none focus:border-[#17324D]"
            />

          </div>

          {/* View Toggle */}

          <div className="flex overflow-hidden rounded-xl border border-[#E5E7EB]">

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

        <h2 className="text-[30px] font-bold text-[#22324A]">
          All Categories
        </h2>

        <p className="mt-2 text-[#7A8797]">
          Browse all available service categories
        </p>

      </div>


      {/* Category Grid */}
{services.length === 0 ? (

  <div className="col-span-full py-16 text-center text-slate-500">
    No categories found.
  </div>

) : view === "grid" ? (

  <div className="grid grid-cols-3 gap-6">

    {services.map((service) => (

      <div
        key={service._id}
        className="rounded-[26px] border border-[#E8EDF2] bg-white p-6 shadow-sm transition hover:shadow-md"
      >

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D]">

          {getServiceIcon(service.name)}

        </div>

        <h3 className="mt-5 text-center text-lg font-semibold text-[#22324A]">
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
        className="flex items-center justify-between rounded-2xl border border-[#E8EDF2] bg-white p-6 shadow-sm"
      >

        <div className="flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF5FB] text-[#17324D]">
            {getServiceIcon(service.name)}
          </div>

          <div>

            <h3 className="text-lg font-semibold text-[#22324A]">
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

        <button className="rounded-full bg-[#17324D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#22476D]">
          View Workers
        </button>

      </div>

    ))}

  </div>

)}

    </section>
  );
}