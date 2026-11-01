
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";
import findNewClientsImage from "../../assets/artisan/find-new-clients.png";

import { Clock3, MapPin, Wrench } from "lucide-react";

const jobs = [
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
  {
    title: "Fix Leaking Pipe",
    description:
      "Kitchen pipe leaking under the sink. Need urgent repair before it gets worse.",
    location: "Lekki Phase 1, Lagos",
    time: "15 min ago",
  },
];

export default function ArtisanDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F5F7F8]">
      {/* Sidebar */}
      <ArtisanSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <main className="min-h-screen min-w-0 lg:ml-[254px]">
        {/* Header */}
        <ArtisanHeader
          isMenuOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
        />

        <div className="px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-7 lg:px-8 lg:pt-8">
          {/* Greeting */}
          <section className="mb-8 flex items-center gap-3 px-1 sm:mb-10 lg:mb-12">
            {/* Temporary profile circle */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#17324D] text-sm font-semibold text-white">
              DE
            </div>

            <div>
              <p className="text-[15px] font-normal leading-5 text-[#222222]">
                Hi Dave
              </p>

              <h1 className="text-[17px] font-semibold leading-6 text-[#111111]">
                Good Morning
              </h1>
            </div>
          </section>

         {/* Find New Clients Banner */}
<section className="relative w-full overflow-hidden rounded-2xl sm:rounded-[24px] lg:rounded-[28px]">
  <img
    src={findNewClientsImage}
    alt="Find new clients"
    className="block h-auto w-full object-contain"
  />
</section>

          {/* Recent Job Listing */}
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <h2 className="mb-5 px-1 text-[17px] font-semibold text-[#111111] sm:mb-7 sm:px-2 lg:mb-8">
              Recent Job Listing
            </h2>

            {/* Job Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-9">
              {jobs.map((job, index) => (
                <article
                  key={index}
                  className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                >
                  {/* Job title */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E8EFF3]">
                      <Wrench
                        size={17}
                        strokeWidth={1.8}
                        className="text-[#185878]"
                      />
                    </div>

                    <h3 className="min-w-0 text-[15px] font-semibold text-[#111111] sm:text-[16px]">
                      {job.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[13px] leading-5 text-[#333333]">
                    {job.description}
                  </p>

                  {/* Location + time */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#777777]">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <MapPin
                        size={15}
                        className="shrink-0"
                        strokeWidth={1.7}
                      />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock3
                        size={15}
                        className="shrink-0"
                        strokeWidth={1.7}
                      />
                      <span>{job.time}</span>
                    </div>
                  </div>

                  {/* Place Bid */}
                  <button
                    type="button"
                    onClick={() => navigate("/artisan/place-bid")}
                    className="mt-4 h-10 w-full rounded-xl bg-[#185A7D] text-[13px] font-medium text-white transition hover:bg-[#124B69]"
                  >
                    Place Bid
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

