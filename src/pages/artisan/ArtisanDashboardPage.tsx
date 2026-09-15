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
  return (
    <div className="flex min-h-screen bg-[#F5F7F8]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="px-8 pb-10 pt-8">
          {/* Greeting */}
          <section className="mb-12 flex items-center gap-3 px-1">
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
          {/* Find New Clients Banner */}
<section className="relative mt-0 h-[255px] overflow-hidden rounded-[28px]">
  <img
    src={findNewClientsImage}
    alt="Find new clients"
    className="absolute inset-0 h-full w-full object-cover"
  />
</section>
          

          {/* Recent Job Listing */}
          <section className="mt-12">
            <h2 className="mb-8 px-2 text-[17px] font-semibold text-[#111111]">
              Recent Job Listing
            </h2>

            {/* Job Grid */}
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job, index) => (
                <article
                  key={index}
                  className="rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                >
                  {/* Job title */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E8EFF3]">
                      <Wrench
                        size={17}
                        strokeWidth={1.8}
                        className="text-[#185878]"
                      />
                    </div>

                    <h3 className="text-[16px] font-semibold text-[#111111]">
                      {job.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[13px] leading-5 text-[#333333]">
                    {job.description}
                  </p>

                  {/* Location + time */}
                  <div className="mt-4 flex items-center gap-5 text-[11px] text-[#777777]">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={15} strokeWidth={1.7} />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock3 size={15} strokeWidth={1.7} />
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